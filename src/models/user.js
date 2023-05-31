'use strict';
const {
  Model
} = require('sequelize');
const { saltWorkFactor } = require('../config/auth');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    async comparePassword(candidatePassword) {
      return bcrypt.compare(candidatePassword, this.password)
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(async (user) => {
    if(user.changed('password')) {
      const salt = await bcrypt.genSalt(saltWorkFactor)
      user.password = await bcrypt.hash(user.password, salt)
    }
  })

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  
  User.associate = (models) => {
    User.hasMany(models.Session, { foreignKey: 'userId' });
    User.hasMany(models.Campaign, { foreignKey: 'userId' });
    User.hasMany(models.Donation, { foreignKey: 'userId' });
  };
  
  return User;
};