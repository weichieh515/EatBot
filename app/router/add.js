//import
const express = require('express'),
    router = express.Router();

//heler
const googleAPI = require('../helper/googleApi'),
    mapping = require('../helper/mapping'),
    errHandle = require('../helper/errHandle');

//gupshup
const carousel = require('../gupshup/carousel');

//mongoDB
const restaurant = require('../mongoDB/restaurant');

//router
router.post('/search', (req, res, next) => {
    let name = req.body.name;
    if (name) {
        console.log(`name:${name}`);
        googleAPI.search(name, (search) => {
            res.json(carousel.add(mapping(search))).status(200);
        }, (err) => {
            errHandle(err, res);
        })
    }
});

router.post('/choose', (req, res, next) => {
    let name = req.body.name;
    let index = req.body.index;
    if (index) {
        console.log(`name:${name} | index:${index}`);
        googleAPI.search(name, (detail) => {
            detail = mapping(detail[index - 1]);
            restaurant.add(detail, () => {
                res.json(carousel.view(detail)).status(200);
            }, (err) => {
                errHandle(err, res);
            })
        }, (err) => {
            errHandle(err, res);
        })
    }
})

module.exports = router;