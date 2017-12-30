//import
const express = require('express'),
    router = express.Router();

//heler
const googleAPI = require('../helper/googleApi'),
    mapping = require('../helper/mapping');

//gupshup
const carousel = require('../gupshup/carousel');

//mongoDB
const restaurant = require('../mongoDB/restaurant');

//router
router.post('/search', (req, res, next) => {
    let name = req.body.name;
    if (name) {
        googleAPI.search(name, (search) => {
            googleAPI.detail(getPlaceId(search), (detail) => {
                res.json(carousel.add(mapping(detail))).status(200);
            })
        })
    }
});

router.post('/choose', (req, res, next) => {
    let place_id = req.body.place_id;
    if (place_id) {
        googleAPI.detail(place_id, (detail) => {
            detail = mapping(detail);
            restaurant.add(detail, () => {
                res.json(carousel.view(detail)).status(200);
            }, (err) => {
                res.json(err.message).status(400);
            })

        })
    }
})

//local function
function getPlaceId(search) {
    let place_id = [];
    search.results.forEach(result => {
        place_id.push(result.place_id);
    });
    return place_id;
}

module.exports = router;