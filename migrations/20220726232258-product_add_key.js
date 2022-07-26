'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
        'Products', 
        'key',
        {
          type: Sequelize.STRING
        }
    );
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn(
        'Products',
        'key',
        {
          type: Sequelize.STRING
        }
    );
  }
};
