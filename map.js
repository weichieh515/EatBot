const API_KEY = "AIzaSyAvhhOpDML3b8E8dgByTn3Fl79gUOANNo0";

module.exports = function (results) {
    var ans = []

    results.forEach(function (item) {

        var result = JSON.parse(item).result;

        var restaurant = {
            name: result.name,
            description: result.formatted_address + '\n' + result.opening_hours.weekday_text.toString(),
            photo: photoURL(result.photos[0].photo_reference),
            mapUrl: `https://www.google.com/maps/place/?q=place_id:${result.place_id}`,
            place_id: result.place_id
        }
        ans.push(restaurant);
    })
    return ans
}

function photoURL(photo_reference) {
    return `https://maps.googleapis.com/maps/api/place/photo?&maxwidth=400&photoreference=${photo_reference}&key=${API_KEY}`
}
