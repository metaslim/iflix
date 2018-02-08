'use strict';

const async = require('async');
const rateHelper = require('./helper');
const responseHelper = require('../../lib/response');

module.exports = {
  createRating: (req, res) => {
    async.parallel({
      user: (callback) => {
        rateHelper.getUser(callback, req.body.userId)
      },
      content: (callback) => {
        rateHelper.getContent(callback, req.body.contentId)
      },
      rating: (callback) => {
        rateHelper.getRating(callback, req.body.rating)
      },
    },
    (error, results) => {
      rateHelper.insertRating(results);
      rateHelper.updateContentStat(results);

      responseHelper.flushJson(
        results,
        res,
        () => { return { description: 'Success' }}
      )
    });
  }
};
