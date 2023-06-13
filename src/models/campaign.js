'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Campaign.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permitDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'inactive'),
      allowNull: false,
      defaultValue: "pending",
    },
    createdAt: {
      allowNull: false,
      type: 'TIMESTAMP',
    },
    updatedAt: {
      allowNull: false,
      type: 'TIMESTAMP',
    }
  }, {
    sequelize,
    modelName: 'Campaign',
  });

  Campaign.associate = (models) => {
    Campaign.belongsTo(models.User, { as: 'fundraiser', foreignKey: 'userId' });
    Campaign.belongsTo(models.Soil, { as: 'soil', foreignKey: 'soilId' });
    Campaign.hasMany(models.Donation, { as: 'donations', foreignKey: 'campaignId' });
    Campaign.hasMany(models.Report, { as: 'reports', foreignKey: 'campaignId' });
  }
  return Campaign;
};