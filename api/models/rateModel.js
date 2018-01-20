var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Why no user?']
  },
  content: {
    type: Schema.Types.ObjectId,
    ref: 'Content',
    required: [true, 'Why no content?']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Why no rating?']
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Rate', RateSchema);
