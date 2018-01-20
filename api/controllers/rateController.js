'use strict';

var async = require("async");
var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');
var User = mongoose.model('User');
var Content = mongoose.model('Content');

exports.create_a_rate = function(req, res) {
  async.parallel({
    user: function(callback) {
      if (!mongoose.Types.ObjectId.isValid(req.query.user_id)) {
        return callback('Invalid used_id');
      }

      console.log(req.query.user_id)
      User.findOne(
        { _id: mongoose.Types.ObjectId(req.query.user_id) },
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
      if (!mongoose.Types.ObjectId.isValid(req.query.user_id)) {
        return callback('Invalid content_id');
      }

      Content.findOne(
        { _id: mongoose.Types.ObjectId(req.query.content_id) },
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
      if (req.query.rating > 5 || req.query.rating < 1) {
        return callback('Invalid rating');
      }

      callback(null, req.query.rating);
    },
  },
  function(err, results) {
    if(err) {
      return res.send(err);
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
          res.send(err);

        res.json({msg : "Thanks for the rate"});
      });
    }
  }
  );
};
