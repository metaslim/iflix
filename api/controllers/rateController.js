'use strict';

var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');

exports.create_a_rate = function(req, res) {
  var new_rate = new Rate(req.body);
  
  new_rate.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
