const router = require('express').Router();
const { Users, Search, Offer } = require('../../model');

router.get('/', async (req, res) => {
  try {
    res.render('profile');
  } catch (err) {
    res.json(err);
  }
});

//Require withAuth

//Update user with preferences information based on its id
router.put('/quiz/:id', async (req, res) => {
  //Calls the update method on the Users model
  await Users.update(
    {
      //All the fields that can be updated and the data attached to the request body
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
      location: req.body.location,
      typeOfHome: req.body.typeOfHome,
      pet: req.body.pet,
    },
    {
      // Gets the user based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    } //Send the information
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => res.json(err));

  Offer.create({
    location: req.body.location,
    typeOfHome: req.body.typeOfHome,
    pet: req.body.pet,
    //Imagen
  });
});

router.post('/offer', async (req, res) => {
  try {
    const newOffer = await Offer.create({
      ...req.body,
      user_id: req.session.id,
      //Revisar si aqui es id o user_id
    });
    res.status(200).json(newOffer);
  } catch (err) {
    res.status(400).json(err);
  }
});

//This endpoint will return information if the user is offering a place and is looking for roomates that matches the user preferences
router.get('/offer', async (req, res) => {
  try {
    const searchData = await Search.findAll({
      where: {
        typeOfHome: req.body.typeOfHome,
        location: req.body.location,
        pet: req.body.pet,
      },
    }); //Pending: change to render into corresponding handlebar
    res.json(searchData);
  } catch (err) {
    res.json(err);
  }
});

//This endpoint will return information if the user is looking for a place and there are places that matches the user preferences
router.get('/search', async (req, res) => {
  try {
    const offerData = await Offer.findAll({
      where: {
        typeOfHome: req.body.typeOfHome,
        location: req.body.location,
        pet: req.body.pet,
      },
    }); //Pending: change to render into corresponding handlebar
    res.json(offerData);
  } catch (err) {
    res.json(err);
  }
});

// // SIGNUP
// // http://localhost:3001/api/users/signup
// router.post('/signup', async (req, res) => {
//   console.log('req: ', req.body);
//   console.log('req username: ', req.body.username);
//   try {
//     const dbUserData = await Users.create({
//       userName: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       userType: req.body.userType,
//     });

//     // Set up sessions with a 'loggedIn' variable set to `true`
//     req.session.save(() => {
//       req.session.loggedIn = true;
//       res.status(200).json(dbUserData);
//       console.log("response sent")
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//     console.log('failure: ', res.status);
//   }
// });

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!dbUserData) {
      console.log("cant find user")
      res
        .status(400)
        .json({ message: 'Cannot Find your account in our system.' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("invalid password")
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log("Catched!")
    console.log(err);
    res.status(500).json(err);
  }
});

// You are SIGNED IN
// http://localhost:3001/api/users/in
// -----EVITAR RENDER SI NO ESTAS SIGNED IN !!!
router.get('/in', async (req, res) => {
  console.log('GET request');
  res.render('profile'); // PLACEHOLDER HANDLEBAR.!!!
  // res.send("You are in!")
});

module.exports = router;
