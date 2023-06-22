const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/profile', userRoutes);

module.exports = router;
