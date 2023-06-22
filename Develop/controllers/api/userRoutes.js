const router = require('express').Router();
const { Users, Search, Offer } = require('../../model');

//Require withAuth

//Update user with preferences information based on its id
router.put('/quiz/:id', async (req, res) => {
    //Calls the update method on the Users model
    await Users.update(
        { //All the fields that can be updated and the data attached to the request body
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
            location: req.body.location,
            typeOfHome: req.body.typeOfHome,
            pet: req.body.pet,
        },
        { // Gets the user based on the id given in the request parameters
            where: {
                id: req.params.id,
            },
        } //Send the information
    ).then((updatedUser) => {
        res.json(updatedUser);
    }).catch((err) => res.json(err));

    Offer.create({
        location: req.body.location,
        typeOfHome: req.body.typeOfHome,
        pet: req.body.pet,
        //Imagen
    });
})

router.post('/offer', withAuth, async (req, res) => {
    try {
        const newOffer = await Offer.create({
            ...req.body,
            user_id: req.session.id
            //Revisar si aqui es id o user_id
        });
        res.status(200).json(newOffer);
    } catch (err) {
        res.status(400).json(err)
    }
})

//This endpoint will return information if the user is offering a place and is looking for roomates that matches the user preferences
router.get('/offer', async (req, res) => {
    try {
        const searchData = await Search.findAll({
            where: {
                typeOfHome: req.body.typeOfHome,
                location: req.body.location,
                pet: req.body.pet
            }
        }); //Pending: change to render into corresponding handlebar
        res.json(searchData);
    } catch (err) {
        res.json(err)
    }
});

//This endpoint will return information if the user is looking for a place and there are places that matches the user preferences
router.get('/search', async (req, res) => {
    try {
        const offerData = await Offer.findAll({
            where: {
                typeOfHome: req.body.typeOfHome,
                location: req.body.location,
                pet: req.body.pet
            }
        }) //Pending: change to render into corresponding handlebar
        res.json(offerData);
    } catch (err) {
        res.json(err)
    }
});


module.exports = router;

