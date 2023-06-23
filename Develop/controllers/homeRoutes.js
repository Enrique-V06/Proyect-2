const { Review } = require('../model');
const router = require('express').Router();

//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // const reviewsData = await Review.findAll({
    //   include: [
    //     {
    //       model: Review,
    //       attributes: ['description','user_id','date_created','title'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const reviews = reviewsData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
