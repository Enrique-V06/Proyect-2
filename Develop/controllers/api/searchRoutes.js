//New endpoint to display options from personalized search

const { Sequelize } = require('sequelize');
const { Users, Search, Offer, Review } = require('../../model');
const router = require('express').Router();

// var newSearch;
// //Make a post
// router.post('/', async (req, res) => {
//     try {
//         newSearch = await Search.create({
//             location: req.body.loc,
//             typeOfHome: req.body.typeOfHome,
//             pet: req.body.pet
//         });
//         res.status(200).json(newSearch)
//         console.log("Search Data", newSearch)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

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

// router.get('/', async (req, res) => {
//     console.log(req.session)
//     if (!req.session.loggedIn) {
//       res.redirect('/');
//     } else {
//       console.log("loged!")
//       try {
//         const offerData = await Offer.findAll({
//             where: {
//                 location: newSearch.search.dataValues.location,
//                 typeOfHome: newSearch.search.dataValues.typeOfHome,
//                 pet: newSearch.search.dataValues.pet,
//             }
//         }
//         );
//         res.status(200).json(offerData)
//         console.log("Offer Data", offerData)
//       } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//       }

//     }
//   });

module.exports = router;
