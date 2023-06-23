const router = require('express').Router();
const { Users, Search, Offer } = require('../../model');

// You are SIGNED IN
// http://localhost:3001/api/user/all
// -----EVITAR RENDER SI NO ESTAS SIGNED IN !!!
router.get('/all', async (req, res) => {
  console.log('---------------LOGED?: ',req.session.loggedIn);
  if (!req.session.loggedIn) {
    console.log("NOT loged!")
    res.redirect('/');
  } else {
    console.log("loged!")
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
        if (!element.pet){
          element.pet = 'No Pets Allowed'
        } else {
          element.pet = 'This home is Pet Friendly'
        }
      });
        
      console.log("-------------homes aft: ", homes);

      res.render('userhomepage', {homes}); 
      // res.render('userhomepage');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    //---------------------------
    // res.render('userhomepage'); 
  }
});

// //Update user with preferences information based on its id
// router.put('/quiz/:id', async (req, res) => {
//   //Calls the update method on the Users model
//   await Users.update(
//     {
//       //All the fields that can be updated and the data attached to the request body
//       userName: req.body.userName,
//       email: req.body.email,
//       password: req.body.password,
//       userType: req.body.userType,
//       location: req.body.location,
//       typeOfHome: req.body.typeOfHome,
//       pet: req.body.pet,
//     },
//     {
//       // Gets the user based on the id given in the request parameters
//       where: {
//         id: req.params.id,
//       },
//     } //Send the information
//   )
//     .then((updatedUser) => {
//       res.json(updatedUser);
//     })
//     .catch((err) => res.json(err));

//   Offer.create({
//     location: req.body.location,
//     typeOfHome: req.body.typeOfHome,
//     pet: req.body.pet,
//     //Imagen
//   });
// });

// router.post('/offer', async (req, res) => {
//   try {
//     const newOffer = await Offer.create({
//       ...req.body,
//       user_id: req.session.id,
//       //Revisar si aqui es id o user_id
//     });
//     res.status(200).json(newOffer);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// //This endpoint will return information if the user is offering a place and is looking for roomates that matches the user preferences
// router.get('/offer', async (req, res) => {
//   try {
//     const searchData = await Search.findAll({
//       where: {
//         typeOfHome: req.body.typeOfHome,
//         location: req.body.location,
//         pet: req.body.pet,
//       },
//     }); //Pending: change to render into corresponding handlebar
//     res.json(searchData);
//   } catch (err) {
//     res.json(err);
//   }
// });

// //This endpoint will return information if the user is looking for a place and there are places that matches the user preferences
// router.get('/search', async (req, res) => {
//   try {
//     const offerData = await Offer.findAll({
//       where: {
//         typeOfHome: req.body.typeOfHome,
//         location: req.body.location,
//         pet: req.body.pet,
//       },
//     }); //Pending: change to render into corresponding handlebar
//     res.json(offerData);
//   } catch (err) {
//     res.json(err);
//   }
// });

module.exports = router;
