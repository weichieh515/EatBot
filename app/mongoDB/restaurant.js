const connect = require('./connect');
module.exports = {
    add: (restaurant, callback, errHandle) => {
        connect((db) => {
            db.collection('restaurant').save(restaurant, (err, result) => {
                return err ? errHandle(err) : callback(result);
            });
        }, (err) => {
            return errHandle(err);
        })
    },
    all: (callback, errHandle) => {
        connect((db) => {
            db.collection('restaurant').find({}).toArray((err, result) => {
                return err ? errHandle(err) : callback(result);
            });
        }, (err) => {
            return errHandle(err);
        })
    },
    random: (callback, errHandle) => {
        connect((db) => {
            db.collection('restaurant').aggregate({
                $sample: {
                    size: 1
                }
            }).toArray((err, result) => {
                return err ? errHandle(err) : callback(result);
            });
        }, (err) => {
            return errHandle(err);
        })
    },
}