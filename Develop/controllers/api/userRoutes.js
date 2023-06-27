/* eslint-disable no-param-reassign */
const router = require('express').Router();
const { Sequelize } = require('sequelize');
const {
  Users, Offer, Review,
} = require('../../model');

// You are SIGNED IN
// http://localhost:3001/api/user
router.get('/', async (req, res) => {
  console.log('---------------LOGED?: ', req.session.loggedIn);
  console.log(req.session);
  if (!req.session.loggedIn) {
    console.log('NOT loged!');
    res.redirect('/');
  } else {
    console.log('loged!');
    const { user } = req.session;
    const searchh = false;
    //---------------------------
    try {
      const dbHomeData = await Offer.findAll(
        {
          order: [Sequelize.fn('RAND')],
          include: [{
            model: Users,
            attributes: ['email', 'userName'],
          }],
        },
      ); //
      console.log('-------------dbHomeData: ', dbHomeData);

      const homes = dbHomeData.map((home) => home.get({ plain: true }));

      homes.forEach((element) => {
        if (!element.pet) {
          element.pet = 'No Pets Allowed';
        } else {
          element.pet = 'This home is Pet Friendly';
        }
      });
      //-----------------

      const DBdrpdwnOpts = await Offer.findAll({ attributes: ['location'] });
      const SrlzdrpdwnOpts = DBdrpdwnOpts.map((locs) => locs.get({ plain: true }));
      const drpdwnOpts = [...new Set(SrlzdrpdwnOpts.map((item) => item.location))];
      console.log('................Dropdown opts: ', drpdwnOpts);
      //-----------------

      const reviewsData = await Review.findAll({ order: [Sequelize.fn('RAND')] });
      const reviews = reviewsData.map((review) => review.get({ plain: true }));

      res.render('userhomepage', {
        homes, reviews, user, searchh, drpdwnOpts,
      });
      // res.render('userhomepage');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    //---------------------------
    // res.render('userhomepage');
  }
});

module.exports = router;
