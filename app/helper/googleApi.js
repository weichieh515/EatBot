const httpGet = require('./httpGet'),
    makeUrl = require('./makeUrl');


let self = module.exports = {
    search: (name, callback, errHandle) => {
        httpGet(makeUrl.search(name), (search) => {
            //use the search result to get detail.
            self.detail(getPlaceId(search), (detail) => {
                return callback(detail)
            }, errHandle)
        }, errHandle);
    },
    detail: (place_id, callback, errHandle) => {
        httpGet(makeUrl.detail(place_id), callback, errHandle);
    }
}

//local function
function getPlaceId(search) {
    let place_id = [];
    search.results.forEach(result => {
        place_id.push(result.place_id);
    });
    return place_id;
}