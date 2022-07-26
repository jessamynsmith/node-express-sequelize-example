'use strict';

const {Product} = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    const products =[{
      name: 'Product1',
      code: 'abc123',
      key: 'firstproductkey',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Product2',
      code: 'def456',
      key: 'secondproductkey',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Product3',
      code: 'ghi789',
      key: 'thirdproductkey',
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
    for (let i = 0; i < products.length; i++) {
      await Product.create(products[i]);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
