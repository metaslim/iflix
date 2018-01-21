'use strict';

const async = require("async");
const rateHelper = require("../helpers/rate");
const responseHelper = require("../helpers/response");

exports.createRating = function(req, res) {
  async.parallel({
    user: function(callback) {
      rateHelper.getUser(callback, req.body.userId)
    },
    content: function(callback) {
      rateHelper.getContent(callback, req.body.contentId)
    },
    rating: function(callback) {
      rateHelper.getRating(callback, req.body.rating)
    },
  },
  function(err, results) {
    rateHelper.insertRating(results);
    rateHelper.updateContentStat(results);

    responseHelper.flushJson(
      results,
      res,
      () => { return {description: "Success"}}
    )
  });
};
