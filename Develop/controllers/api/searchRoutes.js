//New endpoint to display options from personalized search

const { Sequelize } = require('sequelize');
const { Users, Search, Offer, Review } = require('../../model');
const router = require('express').Router();

//Get information based on typeOfHome
router.get('/:typeOfHome', async (req, res) => {
    const typeOfHome = req.params.typeOfHome;
    console.log('IN GET ROUTE, TYPE VAL :', typeOfHome);
    const offerData = await Offer.findAll(
        {
            where: {
                typeOfHome: typeOfHome,
            },
        },
        {
            include: [{ model: Search }],
        }
    );
    console.log('OFFER DATA :', offerData);
});

module.exports = router;
