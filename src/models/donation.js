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
    deadline: {
      type: DataTypes.TIME,
      allowNull: false,
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
    Donation.hasOne(models.PaymentInfo, { as: 'paymentInfo', foreignKey: 'id' });
  }

  return Donation;
};