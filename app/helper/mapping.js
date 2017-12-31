//helper
const makeUrl = require('./makeUrl');

module.exports = (details) => {

    let isArray = Array.isArray(details)
    details = isArray ? details : [details];
    let restaurants = []
    details.forEach(detail => {
        let result = detail.result;
        restaurants.push({
            name: result.name,
            description: result.formatted_address,
            opening_hours: opening_hours(result.opening_hours),
            photoUrl: photo(result.photos),
            phone: result.formatted_phone_number,
            mapUrl: `https://www.google.com/maps/place/?q=place_id:${result.place_id}`,
            place_id: result.place_id
        })
    })
    return isArray ? restaurants : restaurants[0];
}

//local function
function opening_hours(opening_hours) {
    if (opening_hours === undefined) {
        return null;
    }
    let result = '';
    opening_hours.weekday_text.forEach(text => {
        result += `${text}\n`;
    })
    return result;
}

function photo(photos) {
    return photos === undefined ? null : makeUrl.photo(photos[0].photo_reference);
}