'use strict';

const mongoose = require('mongoose');

const cities = {
  zip: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  localized_country_name: {
    type: String,
    trim: true
  },
  distance: {
    type: Number
  },
  city: {
    type: String,
    trim: true
  },
  lon: {
    type: Number
  },
  ranking: {
    type: Number
  },
  id: {
    type: Number
  },
  member_count: {
    type: Number
  },
  lat: {
    type: Number
  }
};

mongoose.model('Cities', new mongoose.Schema(cities));
