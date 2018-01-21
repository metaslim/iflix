'use strict';

const mongoose = require('mongoose');
const ContentStat = require('../models/content_stat');

module.exports = {
  getContentStat: function(callback, contentId) {
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
    .exec((err, result) => {
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


      const content = result.content.name;
      const average_rating = result.number_of_rating < minimum_rating_required ? null : result.average_rating.toFixed(2);  

      callback(null, {
        content: content,
        average_rating: average_rating
      });
    });
  }
};
