const express = require('express'),
    router = express.Router();

//modules
const carousel = require('../gupshup/carousel');


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


router.get('/all', (req, res, next) => {
    res.json(carousel.view(restaurants)).status(200);
});

router.get('/random', (req, res, next) => {
    var restaurant = [restaurants[Math.floor(Math.random() * restaurants.length)]];
    res.json(carousel.view(restaurant)).status(200);
});


module.exports = router;