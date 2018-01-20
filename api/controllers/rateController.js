'use strict';

var async = require("async");
var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');
var User = mongoose.model('User');
var Content = mongoose.model('Content');
var ContentStat = mongoose.model('ContentStat');

exports.create_rating = function(req, res) {
  async.parallel({
    user: function(callback) {
      get_user(callback, req.query.userId)
    },
    content: function(callback) {
      get_content(callback, req.query.contentId)
    },
    rating: function(callback) {
      get_rating(callback, req.query.rating)
    },
  },
  function(err, results) {
    if(err) {
      return res.json({err :err});
    }

    if(results) {
      insert_rating(results, res);
      update_content_stat(results);
      return res.json({msg : "Thanks for the rate"});
    }
  });
};

function get_user(callback, userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return callback('Invalid used_id');
  }

  User.findOne(
    { _id: mongoose.Types.ObjectId(userId) },
    function(err, result) {
      if (!result) {
        return callback('No user found');
      }

      callback(null, result);
    }
  )
}

function get_content(callback, contentId) {
  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    return callback('Invalid ContentId');
  }

  Content.findOne(
    { _id: mongoose.Types.ObjectId(contentId) },
    function(err, result) {
      if (!result) {
        return callback('No content found');
      }

      callback(null, result);
    }
  )
}

function get_rating(callback, rating) {
  if (isNaN(rating)) {
    return callback('Invalid rating');
  }

  if (rating > 5 || rating < 1) {
    return callback('Invalid rating, only 1 - 5 is accepted');
  }

  callback(null, rating);
}

function insert_rating(results, res) {
  var new_rate = new Rate(
    {
      user: results.user._id,
      content: results.content._id,
      rating: results.rating,
    }
  );
  new_rate.save();
}

function update_content_stat(results) {
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
