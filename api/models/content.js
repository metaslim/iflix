'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Why no name?']
  },
  year: {
    type: Number,
    min: 1800,
    max: 9999,
    required: [true, 'Why no year?']
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Content', ContentSchema);
