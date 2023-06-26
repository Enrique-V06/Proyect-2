const { Users, Search, Offer, Review } = require('../../model');
const { beforeUpdate } = require('../../model/users');
const router = require('express').Router();


// /api/profile/
router.get('/', async (req, res) => {
  try {
    console.log("-----------GET REQ a user/profile /")
    const user = req.session.user;
    console.log("---------------------- user: ", user)
    res.render('profile', {user});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Change Password
// /api/profile
router.put('/:email', async (req, res) => {

  try {
    const updatedUser = Users.update(
      //The field that is going to be updated in the Users model
      {
        password: req.body.newPassword
      },
      // Gets a user based on the email in the request parameters
      {
        where: {
          email: req.params.email
        }
      });
      res.status(200).json(updatedUser)
      console.log(updatedUser) 
  } catch (err) {
    res.json(err);
  }
  
});

//Delete account - WORKING
router.delete('/:userEmail', async (req, res) => {
  try {
    Users.destroy({
      where: {
        email: req.params.userEmail
      }
    })
    console.log ('User destroyed')
  } catch (err) {
    res.json(err);
  }
});




module.exports = router;
