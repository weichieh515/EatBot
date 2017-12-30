const express = require('express'),
    router = express.Router();

//routers
const view = require('./view'),
    add = require('./add');

router.use('/view', view);
router.use('/add', add);

module.exports = router;