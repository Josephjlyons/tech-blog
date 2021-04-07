const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
const dashboardRoutes = require('./dashboard-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes)

router.use((req, res) => {
    res.send('<h1>Route Not Found</h1>')
});

module.exports = router;