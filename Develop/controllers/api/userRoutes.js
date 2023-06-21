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

// You are SIGNED IN
// http://localhost:3001/api/users/in
router.get('/in', async (req, res) => {
  console.log("GET request")
  res.render('profile');  // PLACEHOLDER HANDLEBAR.!!!
  // res.send("You are in!")
});


module.exports = router;

