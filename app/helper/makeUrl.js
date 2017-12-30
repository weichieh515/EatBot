const utf8 = require('utf8');

//config
const location = "25.0573651,121.6082145",
    API_KEY = "AIzaSyAvhhOpDML3b8E8dgByTn3Fl79gUOANNo0";

module.exports = {
    search: (name) => {
        name = utf8.encode(name);
        return `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&location=${location}&types=restaurant|food&language=zh-TW&key=${API_KEY}`
    },
    detail: (place_id) => {
        return Array.isArray(place_id) ? toUrlArray(place_id) : `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&language=zh-TW&key=${API_KEY}`
    },
    photo: (photo_reference) => {
        return `https://maps.googleapis.com/maps/api/place/photo?&maxwidth=400&photoreference=${photo_reference}&key=${API_KEY}`
    }
}

function toUrlArray(place_id) {
    let urls = []
    place_id.forEach(id => {
        urls.push(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&language=zh-TW&key=${API_KEY}`);
    });
    return urls;
}