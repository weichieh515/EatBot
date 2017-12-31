const express = require('express'),
    router = express.Router();

//gupshup
const carousel = require('../gupshup/carousel');

//helper
const errHandle = require('../helper/errHandle');

//mongoDB
const restaurant = require('../mongoDB/restaurant');

//routers
router.get('/all', (req, res, next) => {
    restaurant.all((restaurants) => {
        res.json(restaurants.length > 0 ? carousel.view(restaurants) : `Their is no restaurant in my list type "Edit" to Add some`).status(200);
    }, (err) => {
        errHandle(err, res);
    })
});

router.get('/random', (req, res, next) => {
    restaurant.random((restaurants) => {
        res.json(restaurants.length > 0 ? carousel.view(restaurants) : `Their is no restaurant in my list type "Edit" to Add some`).status(200);
    }, (err) => {
        errHandle(err, res);
    })
});

module.exports = router;