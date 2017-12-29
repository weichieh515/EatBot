const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    utf8 = require('utf8'),
    async = require('async'),
    rp = require('request-promise'),
    API_KEY = "AIzaSyAvhhOpDML3b8E8dgByTn3Fl79gUOANNo0",
    port = process.env.PORT || 5000,
    lodash = require('lodash'),
    location = "25.0573651,121.6082145";

var googleAPI = require('./googleapi'),
    carousel = require('./carousel'),
    map = require('./map');

    var restaurants = [{
        name: '福媽香香鍋',
        description: '有滷肉飯、王子麵、冰淇淋吃到飽',
        mapUrl: 'https://www.google.com.tw/maps/place/%E7%A6%8F%E5%AA%BD%E9%A6%99%E9%A6%99%E9%8D%8B/@25.0554612,121.6114194,19z/data=!3m1!4b1!4m5!3m4!1s0x3442ab58da910f7f:0xd204c123bf1dad76!8m2!3d25.0554612!4d121.6119666',
        phone: '02 2788 2120'
    }, {
        name: '印象',
        description: 'Kevin 喜歡的',
        mapUrl: 'https://www.google.com.tw/maps/place/%E5%8D%B0%E8%B1%A119%E7%87%92%E7%83%A4%E5%BF%AB%E9%A4%90/@25.056525,121.6113144,18.98z/data=!4m12!1m6!3m5!1s0x3442ab58ce182de7:0xec2cbeb42bb1f800!2z5Y2w6LGhMTnnh5Lng6Tlv6vppJA!8m2!3d25.0556916!4d121.6116307!3m4!1s0x3442ab58ce182de7:0xec2cbeb42bb1f800!8m2!3d25.0556916!4d121.6116307',
        phone: '02 2788 3602'
    }]

app.use(bodyParser.json());

app.get('/all', function (req, res, next) {
    res.json(makeCarousel(restaurants)).status(200);
});

app.get('/random', function (req, res, next) {
    var restaurant = [restaurants[Math.floor(Math.random() * restaurants.length)]];
    res.json(makeCarousel(restaurant)).status(200);
});

app.post('/search', function (req, res, next) {
    var name = req.body.name;
    googleAPI(text_searchURL(name, location), (search) => {

        var arrayOfPromises = []

        search.results.forEach((item) => {
            arrayOfPromises.push(rp(detailURL(item.place_id)))
        });

        Promise.all(arrayOfPromises)
            .then((arrayOfResp) => {
                res.json(carousel.add(map(arrayOfResp)));
            })
            .catch(function (err) { console.log(err); });
    })
});


app.post('/choose', function (req, res, next) {
    var place_id = req.body.place_id.split('#')[1];
    googleAPI(detailURL(place_id), (resp) => {
        restaurants.push(map([JSON.stringify(resp)]));
        res.json(carousel.show(map([JSON.stringify(resp)])));
    })
});



app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});


function text_searchURL(name, location) {
    name = utf8.encode(name);
    return `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&location=${location}&types=restaurant|food&language=zh-TW&key=${API_KEY}`
}
function detailURL(place_id) {
    return `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&language=zh-TW&key=${API_KEY}`
}
