// This file, like index.js in the models folder, will serve as a means 
// to collect all of the API routes and package them up for us. In this
// case, we are referring to the API routes in user-routes.js. Likewise, we
// use post-routes.js for all API routes related to posts. 

const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// add a '/users', '/posts', and '/comments' prefix for the routes defined above
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;