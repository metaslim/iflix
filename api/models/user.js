'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'Why no first_name?']
  },
  last_name: {
    type: String,
    required: [true, 'Why no last_name?']
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema);
