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



module.exports = router;

