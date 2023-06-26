const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const offerRoutes = require('./offerRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/offer', offerRoutes);
router.use('/search', searchRoutes);

module.exports = router;
