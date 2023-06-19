const express = require('express');
const sequelize = require('./config/connection');

// model import: 
const Users = require('./model');

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
    }).catch((error) => console.log("Error with sequelize link:", error));