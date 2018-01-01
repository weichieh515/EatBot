const callerId = require('caller-id');

module.exports = (err, res) => {
    let caller = callerId.getData();
    console.log(`[ERROR] <${caller.functionName}>\nMessage:${err.message}\n`)
    res.json({
        err: err.message
    }).status(400);
}