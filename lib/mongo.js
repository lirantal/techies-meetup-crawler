'use strict';

const mongoose = require('mongoose');
const q = require('q');
const db = mongoose.connection;
var mongo = {
  db: db
};

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', console.log.bind(console, 'connection succeeded'));

mongo.connect = function() {
  var deferred = q.defer();
  mongoose.connect('mongodb://localhost/meetup', function(err) {
    if (err) {
      return deferred.reject(new Error(err));
    } else {
      return deferred.resolve();
    }
  });

  return deferred.promise;
}

module.exports = mongo;
