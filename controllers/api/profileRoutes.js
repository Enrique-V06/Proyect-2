/* eslint-disable no-param-reassign */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Users, Offer } = require('../../model');
const { beforeUpdate } = require('../../model/users');

// /api/profile/
router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
  } else {
    try {
      console.log('-----------GET REQ a user/profile /');
      const { user } = req.session;
      // ---
      const DBmail = await Users.findAll({
        where: { userName: user },
        attributes: ['email'],
      });
      const profMail = DBmail[0].dataValues.email;
      // console.log("---------------------- MAIL: ", profMail)
      // ---

      res.render('profile', { user, profMail });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// User Offers
// http://localhost:3001/userOffers
router.get('/userOffers', async (req, res) => {
  try {
    const { user } = req.session;
    const offerData = await Offer.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Users,
          attributes: ['email', 'userName'],
        },
      ],
    });

    console.log('IN userOffers route', offerData);
    // Serialize data so the template can read it
    const offers = offerData.map((offer) => offer.get({ plain: true }));

    offers.forEach((element) => {
      if (!element.pet) {
        element.pet = 'No Pets Allowed';
      } else {
        element.pet = 'This home is Pet Friendly';
      }
    });

    console.log('SERIALIZED', offers);
    // for (let i = 0; i < offers.length; i++){
    //   const finalOffers = offers.map((offer) => {
    //     if
    //   })
    // }

    res.render('userOffers', { offers, loggedIn: req.session.loggedIn, user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Change Password - WORKING
router.put('/:email', async (req, res) => {
  try {
    const password = req.body.newPassword;
    // Validar longitud aquí
    const hashPassword = await bcrypt.hash(password, 10);

    const updatedUser = Users.update(
      // The field that is going to be updated in the Users model
      {
        password: hashPassword,
      },
      // Gets a user based on the email in the request parameters
      {
        where: {
          email: req.params.email,
        },
      }
    );
    res.status(200).json();
  } catch (err) {
    res.json(err);
  }
});

// Delete account - WORKING
router.delete('/:userEmail', async (req, res) => {
  try {
    Users.destroy({
      where: {
        email: req.params.userEmail,
      },
    });
    res.status(200).json('Account succesfully deleted');
    console.log('User destroyed');
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
