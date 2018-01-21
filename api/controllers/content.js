'use strict';

const async = require("async");
const contentHelper = require("../helpers/content");
const responseHelper = require("../helpers/response");

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
      () => { return results.content }
    )
  });
};
