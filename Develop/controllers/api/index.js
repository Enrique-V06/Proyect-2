const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/profile', userRoutes);
router.use('profileRoute', profileRoutes);

module.exports = router;
