'use strict';

var async = require("async");
var content_helper = require("../helpers/content");
var response_helper = require("../helpers/response");

exports.show_content = function(req, res) {
  async.parallel({
    content: function(callback) {
      content_helper.get_content_stat(callback, req.query.contentId)
    },
  },
  function(err, results) {
    response_helper.flush_json(
      results,
      res,
      function()
      {
        return results
      }
    )
  });
};
