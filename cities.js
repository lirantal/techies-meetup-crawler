'use strict';

const q = require('q');
const mongoose = require('mongoose');
const db = require('./lib/mongo');
const meetup = require('meetup-api')({
  key: process.env.MEETUP_APIKEY || ''
});


require('./models/cities.js');
const citiesModel = mongoose.model('Cities');

db.connect()
  .then(
    function() {
      console.log('db connected!');
    }
  )
  .then(getCities)
  .then(function(resp) {
    console.log('logging to db');
    resp.results.forEach(function(element) {
      var city = new citiesModel(element);
      city.save(function(err) {
        if (err) console.log(err);
      });
    });
  })
  .then(function(data) {
    process.exit(0);
  })
.catch(function(err) {
  console.log(err);
  process.exit(-1);
});



function getCities() {
  var deferred = q.defer();

  meetup.getCities({page: 250}, function(err, resp) {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(resp);
    }
  });

  return deferred.promise;
}
