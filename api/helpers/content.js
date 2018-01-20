'use strict';

var mongoose = require('mongoose');
var ContentStat = require('../models/content_stat');

module.exports = {
  get_content_stat: function(callback, contentId) {
    const minimum_rating_required = 10;

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return callback('Invalid ContentId');
    }

    ContentStat.findOne(
      {content: mongoose.Types.ObjectId(contentId)}
    )
    .populate('content')
    .exec(function (err, result) {
      if (!result) {
        return callback('No content found');
      }

      var average_rating = result.average_rating;
      var content = result.content.name;

      if (parseInt(result.number_of_rating) < minimum_rating_required) {
        average_rating = null;
      }
      else {
        average_rating = average_rating.toFixed(2)
      }

      callback(null, {
        content: content,
        average_rating: average_rating
      });
    });
  }
};
