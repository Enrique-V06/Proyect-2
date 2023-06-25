const { Users, Search, Offer, Review } = require('../../model');
const router = require('express').Router();

// /api/profile/
router.get('/', async (req, res) => {
  try {
    console.log("-----------GET REQ a user/profile /")
    res.render('profile');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
