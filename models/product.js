'use strict';
const { Model } = require('sequelize');

const cryptoJS = require("crypto-js");

const AES = cryptoJS.AES;
const enc = cryptoJS.enc;

// To generate KEY and IV:
// const crypto = require("crypto");
// crypto.randomBytes(64).toString("base64");

const KEY = enc.Utf8.parse(process.env.KEY);
const IV = enc.Utf8.parse(process.env.IV);


const encrypt = plainText => {
  const AESCipher = AES.encrypt(plainText, KEY, { iv: IV });
  return AESCipher.toString();
};

const decrypt = AESCipher => {
  const AESCipherText = AES.decrypt(AESCipher, KEY, { iv: IV });
  const text = AESCipherText.toString(enc.Utf8);
  return text;
};

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
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {
      beforeFind: function(query) {
        if (query && query.where && query.where.code) {
          query.where.code = encrypt(query.where.code);
        }
      },
      afterFind: function(model) {
        if (model) {
          let data = model;
          if (data.constructor !== Array) {
            data = [data];
          }
          for (let i = 0; i < data.length; i++) {
            if (data[i].dataValues) {
              const decryptedValue = decrypt(data[i].dataValues.code);
              data[i].dataValues.code = decryptedValue;
            } else {
              data[i].code = decrypt(data[i].code);
            }
          }
        }
      },
      beforeCreate: function(model) {
        const encryptedValue = encrypt(model.dataValues.code);
        model.dataValues.code = encryptedValue;
      },
      afterCreate: function(model) {
        model.dataValues.code = decrypt(model.dataValues.code);
      }
    }
  });
  return Product;
};