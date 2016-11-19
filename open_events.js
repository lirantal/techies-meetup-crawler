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
  .then(getOpenEvents)
  .then(function(resp) {
    console.log('logging to db');
    console.log(resp);
    // resp.results.forEach(function(element) {
    //   var city = new citiesModel(element);
    //   city.save(function(err) {
    //     if (err) console.log(err);
    //   });
    // });
  })
  .then(function(data) {
    process.exit(0);
  })
.catch(function(err) {
  console.log(err);
  process.exit(-1);
});

/*
1478880224000
1476605900000
1476434938000

 */


function getOpenEvents() {
  var deferred = q.defer();

console.log('open events');
  //meetup.getOpenEvents({country: 'ro', city: 'cluj-napoca', time: '27470875000,'}, function(err, resp) {
  meetup.getOpenEvents({country: 'ro', city: 'cluj-napoca', time: '1281216400000', page: '2'}, function(err, resp) {
  //1481216400000,
    //console.log(resp);
    if (err) {
      console.log(err);
      deferred.reject(new Error(err));
    } else {
      console.log('got resp1');
      deferred.resolve(resp);
    }
  });

  return deferred.promise;
}
