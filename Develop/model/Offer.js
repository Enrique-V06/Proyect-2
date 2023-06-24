const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Offer extends Model {}

Offer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeOfHome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // imageUrl: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'offer',
  }
);

module.exports = Offer;
