'use strict';

var async = require("async");
var contentHelper = require("../helpers/content");
var responseHelper = require("../helpers/response");

exports.show_content = function(req, res) {
  async.parallel({
    content: function(callback) {
      contentHelper.getContentStat(callback, req.query.contentId)
    },
  },
  function(err, results) {
    responseHelper.flushJson(
      results,
      res,
      function()
      {
        return results
      }
    )
  });
};
