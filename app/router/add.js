const express = require('express'),
    router = express.Router();

//heler
const googleAPI = require('../helper/googleApi'),
    mapping = require('../helper/mapping');
//gupshup
const carousel = require('../gupshup/carousel');

router.post('/search', (req, res, next) => {
    let name = req.body.name;
    if (name) {
        googleAPI.search(name, (search) => {
            googleAPI.detail(getPlaceId(search), (detail) => {
                res.json(carousel.add(mapping(detail)));
            })
        })
    }
});

router.post('/choose', (req, res, next) => {
    let place_id = req.body.place_id;
    if (place_id) {
        googleAPI.detail(place_id, (detail) => {
            res.json(carousel.view(mapping(detail)));
        })
    }
})

function getPlaceId(search) {
    let place_id = [];
    search.results.forEach(result => {
        place_id.push(result.place_id);
    });
    return place_id;
}
module.exports = router;