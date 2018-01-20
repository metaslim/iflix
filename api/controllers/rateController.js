'use strict';

var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');

exports.create_a_rate = function(req, res) {
  user = User.findOne(
    { _id: req.body.user_id }
  )

  if(!user) {
    res.send("User ID " + req.body.user_id + " not found");
  }

  content = Content.findOne(
    { _id: req.body.content_id }
  )

  if(!content) {
    res.send("Content ID " + req.body.content_id + " not found");
  }

  var new_rate = new Rate(
    {
      user: user._id,
      content: content_id,
      rating: req.body.rating
    }
  );

  new_rate.save(function(err, rate) {
    if (err)
      res.send(err);
    res.json({msg : "Thanks for the rate"});
  });
};
