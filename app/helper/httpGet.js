const rp = require('request-promise');

module.exports = function (urls, callback) {
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
            console.log(err);
        });
}