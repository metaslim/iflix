'use strict';

var async = require("async");
var rateHelper = require("../helpers/rate");
var responseHelper = require("../helpers/response");

exports.create_rating = function(req, res) {
  async.parallel({
    user: function(callback) {
      rateHelper.getUser(callback, req.query.userId)
    },
    content: function(callback) {
      rateHelper.getContent(callback, req.query.contentId)
    },
    rating: function(callback) {
      rateHelper.getRating(callback, req.query.rating)
    },
  },
  function(err, results) {
    rateHelper.insertRating(results);
    rateHelper.updateContentStat(results);

    responseHelper.flushJson(
      results,
      res,
      function()
      {
        return {description: "Success"}
      }
    )
  });
};
