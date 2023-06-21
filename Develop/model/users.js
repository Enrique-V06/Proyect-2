const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// New Sequelize model for Users
class Users extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}

Users.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true,
        },

        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {len: [2,10]}
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail: true,},
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [2,20]},
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // location: {
        //     type: DataTypes.STRING, 
        //     allowNull: false,
        // },
        // typeOfHome: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // pet: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        // },  
    },
    {
        hooks: {
          async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'users',
    }
)

module.exports = Users;