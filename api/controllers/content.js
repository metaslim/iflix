'use strict';

var async = require("async");
var content_helper = require("../helpers/content");

exports.show_content = function(req, res) {
  async.parallel({
    content: function(callback) {
      content_helper.get_content_stat(callback, req.query.contentId)
    },
  },
  function(err, results) {
    if(err) {
      return res.json({err: err});
    }

    if(results) {
      return res.json(results);
    }
  });
};
