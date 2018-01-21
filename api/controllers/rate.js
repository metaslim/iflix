'use strict';

var async = require("async");
var rate_helper = require("../helpers/rate");
var response_helper = require("../helpers/response");

exports.create_rating = function(req, res) {
  async.parallel({
    user: function(callback) {
      rate_helper.get_user(callback, req.query.userId)
    },
    content: function(callback) {
      rate_helper.get_content(callback, req.query.contentId)
    },
    rating: function(callback) {
      rate_helper.get_rating(callback, req.query.rating)
    },
  },
  function(err, results) {
    rate_helper.insert_rating(results);
    rate_helper.update_content_stat(results);

    response_helper.flush_json(
      results,
      res,
      function()
      {
        return {description: "Success"}
      }
    )
  });
};
