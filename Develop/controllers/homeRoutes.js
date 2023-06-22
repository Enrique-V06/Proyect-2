// const { Review } = require('../model');
const { Users, Search, Offer, Review } = require('../model');

const router = require('express').Router();

//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // const reviewsData = await Review.findAll({
    //   include: [
    //     {
    //       model: Users,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const reviews = projectData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGNUP
// http://localhost:3001/signup
router.post('/signup', async (req, res) => {
  console.log('req: ', req.body);
  console.log('req username: ', req.body.username);
  // res.status(200).json(req.body);
  try {
    const dbUserData = await Users.create({
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
      console.log("response sent")
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log('failure: ', res.status);
  }
});

//LOGIN

// You are SIGNED IN
// http://localhost:3001/api/users/in
// -----EVITAR RENDER SI NO ESTAS SIGNED IN !!!
router.get('/in', async (req, res) => {
  console.log('GET request');
  res.render('profile'); // PLACEHOLDER HANDLEBAR.!!!
  // res.send("You are in!")
});

module.exports = router;
