// const { Review } = require('../model');
const { Users, Search, Offer, Review } = require('../model');

const router = require('express').Router();

//const withAuth = require('../utils/auth');

//GET REVIEWS
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const reviewsData = await Review.findAll({});

    // Serialize data so the template can read it
    const reviews = reviewsData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { reviews });
  } catch (err) {
    res.status(500).json(err);
  }
});

//CONTACT
// http://localhost:3001/contact
router.get('/contact', async (req, res) => {
  try {
    res.render('contact');
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGNUP
// http://localhost:3001/signup
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await Users.create({
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = req.body.username;
      res.status(200).json(dbUserData);
      console.log('response sent');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log('failure: ', res.status);
  }
});

//LOGIN
// http://localhost:3001/login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!dbUserData) {
      console.log('cant find user');
      res
        .status(400)
        .json({ message: 'Cannot Find your account in our system.' });
      return;
    }
    
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('invalid password');
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = dbUserData.userName;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log('Catched!');
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  console.log('---------- LOGOUT POST REQ RECEIVED');
  if (req.session.loggedIn) {
    // req.session.loggedIn = false;
    // res.status(204).end();
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
