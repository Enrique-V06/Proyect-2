const router = require('express').Router();
const { Users, Search, Offer } = require('../../model');

// You are SIGNED IN
// http://localhost:3001/api/user/all
router.get('/', async (req, res) => {
  console.log('---------------LOGED?: ', req.session.loggedIn);
  console.log(req.session)
  if (!req.session.loggedIn) {
    console.log("NOT loged!")
    res.redirect('/');
  } else {
    console.log("loged!")
    const user = req.session.user;
    //---------------------------
    try {
      const dbHomeData = await Offer.findAll(
      );
      console.log("-------------dbHomeData: ", dbHomeData);

      const homes = dbHomeData.map((home) =>
        home.get({ plain: true })
      );

      // console.log("-------------homes b4: ", homes);

      homes.forEach(element => {
        if (!element.pet) {
          element.pet = 'No Pets Allowed'
        } else {
          element.pet = 'This home is Pet Friendly'
        }
      });

      console.log("-------------homes aft: ", homes);

      res.render('userhomepage', {homes, user}); //homes is the object with location, type of home & pet. user is also comming from this get req.
      // res.render('userhomepage');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    //---------------------------
    // res.render('userhomepage'); 
  }
});

//You are SIGNED IN
// http://localhost:3001/api/user/
// router.get('/', async (req, res) => {
//   if (!req.session.loggedIn) {
//     res.redirect('/');
//   } else {
//     try {
//       const newSearch = await Offer.findAll({
//         where: {
//           location: req.body.location,
//           typeOfHome: req.body.typeOfHome,
//           pet: req.body.pet,
//         }
//       });
//       const searchResults = newSearch.map((search) =>
//         search.get({ plain: true })
//       );
//       res.render('userhomepage', { searchResults });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// })


module.exports = router;