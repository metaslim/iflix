'use strict';

const async = require("async");
const contentHelper = require("../helpers/content");
const responseHelper = require("../helpers/response");

exports.showContent = (req, res) => {
  async.parallel({
    content: (callback) => {
      contentHelper.getContentStat(callback, req.body.contentId)
    },
  },
  (error, results) => {
    responseHelper.flushJson(
      results,
      res,
      () => { return results.content }
    )
  });
};
