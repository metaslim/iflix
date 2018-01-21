'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ContentStatSchema = new Schema({
  content: {
    type: Schema.Types.ObjectId,
    ref: 'Content',
    required: [true, 'Why no content?']
  },
  average_rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  total_rating: {
    type: Number,
    min: 0,
    default: 0
  },
  number_of_rating: {
    type: Number,
    min: 1,
    default: 0
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('ContentStat', ContentStatSchema);
