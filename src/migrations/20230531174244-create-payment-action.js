'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentActions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      donationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Donations',
          key: 'id',
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE',
      },
      name: {
        type: Sequelize.STRING
      },
      method: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PaymentActions');
  }
};