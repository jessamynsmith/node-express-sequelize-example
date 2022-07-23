'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
      name: 'Product1',
      code: 'abc123',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Product2',
      code: 'def456',
      createdAt: new Date(),
      updatedAt: new Date(),
      
    }, {
      name: 'Product3',
      code: 'ghi789',
      createdAt: new Date(),
      updatedAt: new Date(),
      
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
