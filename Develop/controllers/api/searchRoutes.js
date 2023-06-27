/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
// New endpoint to display options from personalized search

const { Sequelize } = require('sequelize');
const router = require('express').Router();
const {
  Users, Offer, Review,
} = require('../../model');

// You made a SEARCH
// http://localhost:3001/api/search
router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    console.log('NOT loged!');
    res.redirect('/');
  } else {
    console.log('loged!');
    const { user } = req.session;
    //---------------------------
    const { param1 } = req.query;
    const { param2 } = req.query;
    const { param3 } = req.query;
    console.log('QUERY PARAMS: ');
    console.log('Param1: ', param1, 'Param2: ', param2, 'Param3: ', param3);

    try {
      // --------------------
      let dbSrchHomeData;
      if (param1 && param2 && param3) {
        console.log('los 3');
        dbSrchHomeData = await Offer.findAll(
          {
            where:
          {
            location: param1,
            typeOfHome: param2,
            pet: param3,
          },
            include: [{
              model: Users,
              attributes: ['email', 'userName'],
            }],
          },
        );
      } else if (param1 && param2) {
        console.log('los 2');
        dbSrchHomeData = await Offer.findAll(
          {
            where:
          {
            location: param1,
            typeOfHome: param2,
          },
            include: [{
              model: Users,
              attributes: ['email', 'userName'],
            }],
          },
        );
      } else if (param1) {
        if (param1 == 'House' || param1 == 'Apartment') {
          console.log('solo type');
          dbSrchHomeData = await Offer.findAll(
            {
              where: { typeOfHome: param1 },
              include: [{
                model: Users,
                attributes: ['email', 'userName'],
              }],
            },
          );
        } else {
          console.log('solo loc');
          dbSrchHomeData = await Offer.findAll(
            {
              where: { location: param1 },
              include: [{
                model: Users,
                attributes: ['email', 'userName'],
              }],
            },
          );
        }
      }

      const mySrch = dbSrchHomeData.map((offer) => offer.get({ plain: true }));
      mySrch.forEach((element) => {
        if (!element.pet) {
          element.pet = 'No Pets Allowed';
        } else {
          element.pet = 'This home is Pet Friendly';
        }
      });
      console.log('*********serialized: ', mySrch);

      //-----------------
      const DBdrpdwnOpts = await Offer.findAll({ attributes: ['location'] });
      const SrlzdrpdwnOpts = DBdrpdwnOpts.map((locs) => locs.get({ plain: true }));
      const drpdwnOpts = [...new Set(SrlzdrpdwnOpts.map((item) => item.location))];
      // console.log("................Dropdown opts: ", drpdwnOpts)
      //-----------------

      const reviewsData = await Review.findAll({ order: [Sequelize.fn('RAND')] });
      const reviews = reviewsData.map((review) => review.get({ plain: true }));

      req.session.save(() => {
        req.session.search = true;
        const searchh = req.session.search;
        console.log(req.session);
        res.render('userhomepage', {
          mySrch, reviews, user, searchh, drpdwnOpts,
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

//----------------------------------------------------------
// //Make a post
// router.post('/', async (req, res) => {
//   console.log("---------------------------POSTTTTTTT")
//   console.log("REQ.BODY: ")
//   console.log(req.body)
//     try {
//     let dbSrchHomeData;
//       if (req.body.loc && req.body.type && req.body.pet){
//         console.log("los 3")
//         dbSrchHomeData = await Offer.findAll(
//           { where:
//           {location: req.body.loc,
//           typeOfHome: req.body.type,
//           pet: req.body.pet,}
//           }
//         );
//       } else if (req.body.loc && req.body.type) {
//         console.log("los 2")
//         dbSrchHomeData = await Offer.findAll(
//           { where:
//           {location: req.body.loc,
//           typeOfHome: req.body.type}
//           }
//         );
//       } else if (req.body.loc) {
//         console.log("solo loc")
//         dbSrchHomeData = await Offer.findAll(
//           { where: {location: req.body.loc}}
//         );
//       } else if (req.body.type) {
//         console.log("solo type")
//         dbSrchHomeData = await Offer.findAll(
//           { where: {location: req.body.type}}
//         );
//       }

//       console.log(dbSrchHomeData);
//       // const mySrch = dbSrchHomeData.get({ plain: true });
//       const mySrch = dbSrchHomeData.map((offer) => offer.get({ plain: true }));

//       console.log("*********serialized: ", mySrch)
//       //-------------------

//       res.render('try');
//       // res.status(200).json(mySrch)

//     } catch (err) {
//         res.status(500).json(err);
//         console.log("----- ABSOLUTE FAILURE", err)
//     }
// })

module.exports = router;
