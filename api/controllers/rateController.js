'use strict';

var async = require("async");
var rate_helper = require("../helpers/rateHelper");

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
    if(err) {
      return res.json({err: err});
    }

    if(results) {
      rate_helper.insert_rating(results);
      rate_helper.update_content_stat(results);
      return res.json({msg: "Thanks for the rate"});
    }
  });
};
