var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var exports = module.exports = {};

var MongoClient = mongodb.MongoClient;
var dbUrl = process.env.MONGOLAB_URI;