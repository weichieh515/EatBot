const connect = require('./connect');

let self = module.exports = {
    add: (restaurant, callback, errHandle) => {
        self.findOne(restaurant, (result) => {
            if (!result) {
                self.insert(restaurant, callback, errHandle);
            } else {
                return errHandle(`${restaurant.name} is already in the Titansoft list`)
            }
        }, (err) => {
            return errHandle(err);
        })
    },
    insert: (restaurant, callback, errHandle) => {
        connect((db) => {
            db.collection('restaurant').save(restaurant, (err, result) => {
                return err ? errHandle(err) : callback(result);
            });
        }, (err) => {
            return errHandle(err);
        })
    },
    findOne: (restaurant, callback, errHandle) => {
        connect((db) => {
            db.collection('restaurant').findOne({
                place_id: restaurant.place_id
            }, (err, result) => {
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
            db.collection('restaurant').aggregate([{
                $sample: {
                    size: 1
                }
            }]).toArray((err, result) => {
                return err ? errHandle(err) : callback(result);
            });
        }, (err) => {
            return errHandle(err);
        })
    },
}