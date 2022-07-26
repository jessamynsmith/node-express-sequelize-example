'use strict';
const { Model } = require('sequelize');

const { encrypt, decrypt } = require('../helpers/encryption');


module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    encryptedFields: ['code', 'key'],
    hooks: {
      beforeFind: function(query) {
        for (let i = 0; i < this.options.encryptedFields.length; i++) {
          const propName = this.options.encryptedFields[i];
          if (query && query.where && query.where[propName]) {
            query.where[propName] = encrypt(query.where[propName]);
          }
        }
      },
      afterFind: function(model) {
        if (model) {
          let data = model;
          if (data.constructor !== Array) {
            data = [data];
          }
          
          for (let i = 0; i < this.options.encryptedFields.length; i++) {
            const propName = this.options.encryptedFields[i];
            
            for (let i = 0; i < data.length; i++) {
              if (data[i].dataValues) {
                const decryptedValue = decrypt(data[i].dataValues[propName]);
                data[i].dataValues[propName] = decryptedValue;
              } else {
                data[i][propName] = decrypt(data[i][propName]);
              }
            }
          }
        }
      },
      beforeCreate: function(model) {
        for (let i = 0; i < this.options.encryptedFields.length; i++) {
          const propName = this.options.encryptedFields[i];
          const encryptedValue = encrypt(model.dataValues[propName]);
          model.dataValues[propName] = encryptedValue;
        }
      },
      afterCreate: function(model) {
        for (let i = 0; i < this.options.encryptedFields.length; i++) {
          const propName = this.options.encryptedFields[i];
          model.dataValues[propName] = decrypt(model.dataValues[propName]);
        }
      }
    }
  });
  return Product;
};