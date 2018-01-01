const httpGet = require('./httpGet'),
    makeUrl = require('./makeUrl');


let self = module.exports = {
    search: (name, callback, errHandle) => {
        httpGet(makeUrl.search(name), (search) => {
            //use the search result to get detail.
            let status = checkStatus(search);
            if (status.ok) {
                self.detail(getPlaceId(search), (detail) => {
                    return callback(detail);
                }, errHandle)
            } else {
                return errHandle(`Google Api Status: ${status.status}`)
            }
        }, errHandle);
    },
    detail: (place_id, callback, errHandle) => {
        httpGet(makeUrl.detail(place_id), (detail) => {
            let status = checkStatus(detail);
            if (status.ok) {
                return callback(detail)
            } else {
                return errHandle(`Google Api Status: ${status.status}`)
            }
        }, errHandle);
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

function checkStatus(resp) {
    let status = {};
    resp = Array.isArray(resp) ? resp : [resp]

    for (let res of resp) {
        status.ok = res.status == 'OK';
        status.status = res.status
        if (!status.ok) break;
    }
    return status;
}