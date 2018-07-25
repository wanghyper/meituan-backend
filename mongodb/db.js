const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.DB_URL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connecting to the database Successfully');
});

db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function () {
    console.log('The database is disconnected and try to reconnect the database');
    mongoose.connect(config.DB_URL, {server: {auto_reconnect: true}});
});

module.exports = db;
