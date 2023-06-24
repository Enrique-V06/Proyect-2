const { Users, Search, Offer, Review } = require('../../model');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const offerData = await Offer.create({
      location: req.body.location,
      typeOfHome: req.body.typeOfHome,
      pet: req.body.pet,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(offerData);
      console.log('response sent');
    });
  } catch (err) {}
});

module.exports = router;
