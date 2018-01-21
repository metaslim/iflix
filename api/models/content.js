'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ContentSchema = new Schema({
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
