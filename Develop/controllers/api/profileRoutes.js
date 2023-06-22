const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.render('profile');
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
