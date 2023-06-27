const { Users, Search, Offer, Review } = require('../../model');
const router = require('express').Router();

// /api/profile/
router.get('/', async (req, res) => {
  try {
    console.log('-----------GET REQ a user/profile /');
    const user = req.session.user;
    console.log('---------------------- user: ', user);
    res.render('profile', { user });
  } catch (err) {
    res.status(500).json(err);
  }
});

//User Offers
// http://localhost:3001/userOffers
router.get('/userOffers', async (req, res) => {
  try {
    const offerData = await Offer.findAll({
      where: { user_id: req.session.user_id },
    });

    console.log('IN userOffers route', offerData);
    // Serialize data so the template can read it
    const offers = offerData.map((offer) => offer.get({ plain: true }));
    console.log('SERIALIZED', offers);
    // for (let i = 0; i < offers.length; i++){
    //   const finalOffers = offers.map((offer) => {
    //     if
    //   })
    // }

    res.render('userOffers', { offers, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
