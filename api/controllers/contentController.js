'use strict';

var async = require("async");
var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');
var User = mongoose.model('User');
var Content = mongoose.model('Content');
var ContentStat = mongoose.model('ContentStat');

exports.show_content = function(req, res) {
  const minimum_rating_required = 10;

  if (!mongoose.Types.ObjectId.isValid(req.query.contentId)) {
    return res.json({err: 'Invalid ContentId'});
  }

  ContentStat.findOne(
    {content: mongoose.Types.ObjectId(req.query.contentId)}
  )
  .populate('content')
  .exec(function (err, result) {
    if (err) {
      res.json({err: err});
    }

    if (result) {
      var average_rating = result.average_rating;
      var content = result.content.name;

      if (parseInt(result.number_of_rating) < minimum_rating_required) {
        average_rating = 0;
      }

      res.json(
        {
          content: content,
          average_rating: average_rating.toFixed(2)
        }
      );
    }
    else {
      res.json({err: 'No content found'});
    }
  });
};
