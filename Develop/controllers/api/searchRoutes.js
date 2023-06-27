//New endpoint to display options from personalized search

const { Sequelize } = require('sequelize');
const { Users, Search, Offer, Review } = require('../../model');
const router = require('express').Router();

//Make a post
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

//----------------------------------------------------------
// You made a SEARCH 
// http://localhost:3001/api/search
router.get('/', async (req, res) => {

  if (!req.session.loggedIn) {
    console.log("NOT loged!")
    res.redirect('/');
  } else {
    console.log("loged!")
    const user = req.session.user;
    //---------------------------
    const param1 = req.query.param1;
    const param2 = req.query.param2;
    const param3 = req.query.param3;
    console.log("QUERY PARAMS: ")
    console.log("Param1: ", param1, "Param2: ", param2, "Param3: ", param3)


    try {
      // --------------------
      let dbSrchHomeData;
      if (param1 && param2 && param3){
        console.log("los 3")
        dbSrchHomeData = await Offer.findAll(
          { where: 
          {location: param1,
          typeOfHome: param2,
          pet: param3,}
          }
        );
      } else if (param1 && param2) {
        console.log("los 2")
        dbSrchHomeData = await Offer.findAll(
          { where: 
          {location: param1,
          typeOfHome: param2}
          }
        ); 
      } else if (param1) {
        console.log("solo loc")
        dbSrchHomeData = await Offer.findAll(
          { where: {location: param1}}
        ); 
      } else if (param2) {
        console.log("solo type")
        dbSrchHomeData = await Offer.findAll(
          { where: {location: param2}}
        ); 
      }
      
      console.log(dbSrchHomeData);
      const mySrch = dbSrchHomeData.map((offer) => offer.get({ plain: true }));
      console.log("*********serialized: ", mySrch)
      //---------------------

      const reviewsData = await Review.findAll({order: [Sequelize.fn('RAND')]});
      const reviews = reviewsData.map((review) => review.get({plain:true}));
      
      req.session.save(() => {
        req.session.search = true;
        const searchh = req.session.search;
        console.log(req.session)
        res.render('userhomepage', {mySrch, reviews, user, searchh}); // 
      });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    //---------------------------
    // res.render('userhomepage'); 
  }
});


module.exports = router;
