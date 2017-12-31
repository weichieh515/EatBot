const rp = require('request-promise');

module.exports = (urls, callback, errHandle) => {
    //change [url] to array if not so.
    let multi = Array.isArray(urls);
    urls = multi ? urls : [urls];

    let arrayOfPromises = []
    urls.forEach(url => {
        arrayOfPromises.push(rp({
            uri: url,
            json: true
        }));
    });

    Promise.all(arrayOfPromises)
        .then((arrayOfResp) => {
            return callback(multi ? arrayOfResp : arrayOfResp[0]);
        })
        .catch(function (err) {
            return errHandle(err);
        });
}