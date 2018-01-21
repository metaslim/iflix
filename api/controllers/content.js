'use strict';

let async = require("async");
let contentHelper = require("../helpers/content");
let responseHelper = require("../helpers/response");

exports.showContent = function(req, res) {
  async.parallel({
    content: function(callback) {
      contentHelper.getContentStat(callback, req.body.contentId)
    },
  },
  function(err, results) {
    responseHelper.flushJson(
      results,
      res,
      function()
      {
        return results.content
      }
    )
  });
};
