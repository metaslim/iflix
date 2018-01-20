'use strict';

var async = require("async");
var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');
var User = mongoose.model('User');
var Content = mongoose.model('Content');
var ContentStat = mongoose.model('ContentStat');

exports.create_a_rate = function(req, res) {
  async.parallel({
    user: function(callback) {
      if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
        return callback('Invalid used_id');
      }

      User.findOne(
        { _id: mongoose.Types.ObjectId(req.query.userId) },
        function(err, result) {
          if (err) {
            callback(err);
          }
          else {
            if (!result) {
              return callback('No user found');
            }

            callback(null, result);
          }
        }
      )
    },
    content: function(callback) {
      if (!mongoose.Types.ObjectId.isValid(req.query.contentId)) {
        return callback('Invalid ContentId');
      }

      Content.findOne(
        { _id: mongoose.Types.ObjectId(req.query.contentId) },
        function(err, result) {
          if (err) {
            callback(err);
          }
          else {
            if (!result) {
              return callback('No content found');
            }

            callback(null, result);
          }
        }
      )
    },
    rating: function(callback) {
      if (isNaN(req.query.rating)) {
        return callback('Invalid rating');
      }

      if (req.query.rating > 5 || req.query.rating < 1) {
        return callback('Invalid rating, only 1 - 5 is accepted');
      }

      callback(null, req.query.rating);
    },
  },
  function(err, results) {
    if(err) {
      return res.json({err :err});
    }

    if(results) {
      var new_rate = new Rate(
        {
          user: results.user._id,
          content: results.content._id,
          rating: results.rating,
        }
      );

      new_rate.save(function(err, rate) {
        if (err)
          return res.json({err: err});


        ContentStat.findOne(
          { content: mongoose.Types.ObjectId(results.content._id) },
          function(err, result) {
            if (err) {
              return res.json({err: err});
            }

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
        return res.json({msg : "Thanks for the rate"});
      });
    }
  });
};
