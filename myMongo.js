const {MongoClient} = require('mongodb');

const MONGO_URL = process.env.MONGOLAB_URI;

module.exports = async () => {
    const db = await MongoClient.connect(MONGO_URL);
    return {
        Users: db.collection('bookUsers'),
    };
}