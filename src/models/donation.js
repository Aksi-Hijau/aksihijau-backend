'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donation.init({
    invoice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete : 'CASCADE',
      onUpdate : 'CASCADE',
    },
    campaignId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Campaigns',
        key: 'id',
      },
      onDelete : 'CASCADE',
      onUpdate : 'CASCADE',
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Payments',
        key: 'id',
      },
      onDelete : 'SET NULL',
      onUpdate : 'CASCADE',
    },
    paymentType: {
      type: DataTypes.ENUM("bank", "ewallet"),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("gopay", "shopeepay", "bni", "bca", "bri"),
      allowNull: true,
    },
    vaNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 100,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
    deadline: {
      type: 'TIMESTAMP',
      allowNull: false,
    },
    paidAt: {
      allowNull: true,
      type: 'TIMESTAMP',
    },
    createdAt: {
      allowNull: true,
      type: 'TIMESTAMP',
    },
    updatedAt: {
      type: 'TIMESTAMP',
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Donation',
  });

  Donation.associate = (models) => {
    Donation.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Donation.belongsTo(models.Campaign, { as: 'campaign', foreignKey: 'campaignId' });
    Donation.belongsTo(models.Payment, { as: 'payment', foreignKey: 'paymentId' });
  }

  return Donation;
};