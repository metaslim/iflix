var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Why no name?']
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Content', ContentSchema);
