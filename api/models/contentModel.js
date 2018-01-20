'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'Why no name?']
  },
  last_name: {
    type: String,
    required: [true, 'Why no name?']
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Content', ContentSchema);
