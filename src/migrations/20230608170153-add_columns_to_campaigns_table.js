'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Campaigns', 'permitDocument', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: 'description'
    })

    await queryInterface.addColumn('Campaigns', 'location', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'target'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Campaigns', 'permitDocument')
    await queryInterface.removeColumn('Campaigns', 'location')
  }
};
