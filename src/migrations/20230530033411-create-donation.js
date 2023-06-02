'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE',
      },
      campaignId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Campaigns',
          key: 'id',
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE',
      },
      paymentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Payments',
          key: 'id',
        },
        onDelete : 'SET NULL',
        onUpdate : 'CASCADE',
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 100,
      },
      paymentType: {
        type: Sequelize.ENUM("bank", "ewallet"),
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.ENUM("gopay", "shopeepay", "bni", "bca", "bri"),
        allowNull: true,
      },
      vaNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "paid", "failed"),
        allowNull: false,
      },
      deadline: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      paidAt: {
        allowNull: true,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Donations');
  }
};