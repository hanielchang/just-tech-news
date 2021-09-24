// This file, like index.js in the models folder, will serve as a means 
// to collect all of the API routes and package them up for us. In this
// case, we are referring to the API routes in user-routes.js

const router = require('express').Router();

const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;