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


module.exports = router;