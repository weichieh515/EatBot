const httpGet = require('./httpGet'),
    makeUrl = require('./makeUrl');


module.exports = {
    search: (name, callback) => {
        httpGet(makeUrl.search(name), callback);
    },
    detail: (place_id, callback) => {
        httpGet(makeUrl.detail(place_id), callback);
    }

}