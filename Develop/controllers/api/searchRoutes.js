//New endpoint to display options from personalized search

const { Sequelize } = require('sequelize');
const { Users, Search, Offer, Review } = require('../../model');
const router = require('express').Router();

//Make a post
router.post('/', async (req, res) => {
    try {
        const newSearch = await Search.create({
            location: req.body.loc,
            typeOfHome: req.body.typeOfHome,
            pet: req.body.pet
        });
        console.log("Search Data", newSearch)
    } catch (err) {
        res.status(500).json(err);
    }
})


// //GET request to display search data
// //api/search
// router.get('/', async (req, res) => {
//     if (!req.session.loggedIn) {
//         console.log("NOT loged!")
//         res.redirect('/');
//     } else {
//         try {
//             const searchData = Offer.findAll({
//                 where: {
//                     location: req.body.location,
//                     typeOfHome: req.body.typeOfHome,
//                     pet: req.body.pet,
//                 }
//             });
//             res.render('userhomepage')
//             console.log(searchData);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     }
// });

router.get('/', async (req, res) => {
    console.log(req.session)
    if (!req.session.loggedIn) {
      res.redirect('/');
    } else {
      console.log("loged!")
      try {
        const offerData = await Offer.findAll({
            where: {
                location: req.body.location,
                typeOfHome: req.body.typeOfHome,
                pet: req.body.pet,
            }
        }, {include: [{ model: Search }]}
        );
        res.render('userhomepage');

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }

    }
  });

module.exports = router;
