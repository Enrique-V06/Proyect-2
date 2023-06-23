const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// model import:
const Users = require('./model');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET, //???
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((error) => console.log('Error with sequelize link:', error));
