'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Report.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    campaignId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Report',
  });

  Report.associate = (models) => {
    Report.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Report.belongsTo(models.Campaign, { as: 'campaign', foreignKey: 'campaignId' });
  }

  return Report;
};