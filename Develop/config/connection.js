const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    // Database name
    process.env.DB_NAME, 
    // 'RoomieFinder_db',
    // User
    process.env.DB_USER, 
    // 'root',
    // Password
    process.env.DB_PW,
    {
      // Database location
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306
    }
  );
  
  module.exports = sequelize;