const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Search extends Model { }

Search.init(
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
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        modelName: 'search',
      },
);

module.exports = Search;