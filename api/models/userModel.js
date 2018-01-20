'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Why no name?']
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema);
