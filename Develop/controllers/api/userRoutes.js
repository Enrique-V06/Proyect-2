const router = require('express').Router();
const { Users, Search } = require('../../model');

router.get('/', async (req, res) => {
    try {
        const searchData = await Search.findAll({ where: {
            pet: req.body.pet,
            location: req.body.location,
            typeOfHome: req.body.typeOfHome
        }})
        res.json(searchData)
    } catch (err) {
        res.json(err)
    }
});

// SIGNUP 
// http://localhost:3001/api/users/signup
router.post('/signup', async (req, res) => {
    console.log("req: ",  req.body)
    console.log("req username: ",  req.body.username)
    try {
      const dbUserData = await Users.create({
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
      });

      // Set up sessions with a 'loggedIn' variable set to `true`
      req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json(dbUserData);
      });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      console.log("failure: ", res.status);
    }
});

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
  console.log("GET request")
  res.render('profile');  // PLACEHOLDER HANDLEBAR.!!!
  // res.send("You are in!")
});


module.exports = router;

