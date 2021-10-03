// Much like the API folder's index.js file that collects the endpoints and prefixes them, 
// here we are collecting the packaged group of API endpoints and prefixing them with the path /api.

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;