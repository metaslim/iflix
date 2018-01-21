'use strict';

var mongoose = require('mongoose');
var ContentStat = require('../models/content_stat');
var Content = require('../models/content');
var Rate = require('../models/rate');
var User = require('../models/user');

module.exports = {
  getUser: function(callback, userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      callback(
        null,
        {
          error:
          {
            description: 'userId must be single String of 12 bytes or a string of 24 hex characters.',
            code: 400
          }
        }
      );
    }
    else {
      User.findOne(
        { _id: mongoose.Types.ObjectId(userId) },
        function(err, result) {
          if (!result) {
            callback(
              null,
              {
                error:
                {
                  description: 'User does not exist',
                  code: 404
                }
              }
            );
          }
          else {
            callback(null, result);
          }
        }
      )
    }
  },

  getContent: function(callback, contentId) {
    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      callback(
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
    else
    {
      Content.findOne(
        { _id: mongoose.Types.ObjectId(contentId) },
        function(err, result) {
          if (!result) {
            callback(
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
          else {
            callback(null, result);
          }
        }
      )
    }
  },

  getRating: function(callback, rating) {
    if (isNaN(rating) || (rating > 5 || rating < 1)) {
      callback(
        null,
        {
          error:
          {
            description: 'Invalid rating, only 1 - 5 is accepted',
            code: 400
          }
        }
      );
    } else {
      callback(null, rating);
    }
  },

  insertRating: function(results) {
    if (results.user.error || results.content.error || results.rating.error) {
      return;
    }

    var new_rate = new Rate(
      {
        user: results.user._id,
        content: results.content._id,
        rating: results.rating,
      }
    );
    new_rate.save();
  },

  updateContentStat: function(results) {
    if (results.user.error || results.content.error || results.rating.error) {
      return;
    }

    ContentStat.findOne(
      { content: mongoose.Types.ObjectId(results.content._id) },
      function(err, result) {
        if (result) {
          result.total_rating = parseInt(result.total_rating) + parseInt(results.rating);
          result.number_of_rating = parseInt(result.number_of_rating) + 1;
          result.average_rating = parseInt(result.total_rating) / parseInt(result.number_of_rating);
          result.save();
        }
        else {
          var newContentStat = new ContentStat(
            {
              content: results.content._id,
              total_rating: results.rating,
              number_of_rating: 1,
              average_rating: results.rating
            }
          );
          newContentStat.save();
        }
      }
    );
  }
};
