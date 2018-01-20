'use strict';

var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');

exports.create_a_rate = function(req, res) {
  var new_rate = new Rate(
    {
      user: req.body.user_id,
      content: req.body.content_id,
      rating: req.body.rating
    }
  );

  new_rate.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
