const { Users, Search, Offer, Review } = require('../../model');
const { beforeUpdate } = require('../../model/users');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// /api/profile/
router.get('/', async (req, res) => {
  try {
    console.log('-----------GET REQ a user/profile /');
    const user = req.session.user;
    console.log('---------------------- user: ', user);
    res.render('profile', { user });
  } catch (err) {
    res.status(500).json(err);
  }
});


//User Offers
// http://localhost:3001/userOffers
router.get('/userOffers', async (req, res) => {
  try {
    const offerData = await Offer.findAll({
      where: { user_id: req.session.user_id },
    });

    console.log('IN userOffers route', offerData);
    // Serialize data so the template can read it
    const offers = offerData.map((offer) => offer.get({ plain: true }));
    console.log('SERIALIZED', offers);
    // for (let i = 0; i < offers.length; i++){
    //   const finalOffers = offers.map((offer) => {
    //     if
    //   })
    // }

    res.render('userOffers', { offers, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Change Password - WORKING
router.put('/:email', async (req, res) => {

  try {
    const password = req.body.newPassword
    //Validar longitud aquí
    const hashPassword = await bcrypt.hash(password, 10);

    const updatedUser = Users.update(
      //The field that is going to be updated in the Users model
      {
        password: hashPassword
      },
      // Gets a user based on the email in the request parameters
      {
        where: {
          email: req.params.email
        }
      });
      res.status(200).json() 
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
    res.status(200).json('Account succesfully deleted')
    console.log ('User destroyed')
  } catch (err) {
    res.json(err);
  }
});





module.exports = router;
