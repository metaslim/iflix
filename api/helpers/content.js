'use strict';

var mongoose = require('mongoose');
var ContentStat = require('../models/content_stat');

module.exports = {
  get_content_stat: function(callback, contentId) {
    const minimum_rating_required = 10;

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return callback(
        null,
        {
          error:
          {
            description: 'contentId must be single String of 12 bytes or a string of 24 hex characters.',
            code: 400
          }
        }
      );
    }

    ContentStat.findOne(
      {content: mongoose.Types.ObjectId(contentId)}
    )
    .populate('content')
    .exec(function (err, result) {
      if (!result) {
        return callback(
          null,
          {
            error:
            {
              description: 'Content does not exist',
              code: 404
            }
          }
        );
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
