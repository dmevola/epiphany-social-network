const router = require('express').Router();

// user and thought routes
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

//add /users to created routes
router.use('/users', userRoutes);

//add /thoughts to created routes
router.use('/thoughts', thoughtsRoutes);

//export module router
module.exports = router;