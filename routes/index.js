// require express
const router = require('express').Router();

//import all API routes
const apiRoutes = require('./api');

//add prefix /api to all api routes
router.use('/api', apiRoutes);

// error handling
router.use((req, res) => {
    res.status(404).send('<h1>404 Error</h1>');
});

module.exports = router;

