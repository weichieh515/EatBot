var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://tseatbot:tseatbot@tseatbot-shard-00-00-1pvbe.mongodb.net:27017,tseatbot-shard-00-01-1pvbe.mongodb.net:27017,tseatbot-shard-00-02-1pvbe.mongodb.net:27017/test?ssl=true&replicaSet=TsEatBot-shard-0&authSource=admin';

module.exports = (callback, errHandle) => {
    MongoClient.connect(url, (err, client) => {
        return err ? errHandle(err) : callback(client.db('titansoft'));
    });
}