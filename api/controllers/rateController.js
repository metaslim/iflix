'use strict';

var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');

exports.create_a_rate = function(req, res) {
  user = User.findOne(
    { _id: req.body.user_id },
    '_id',
    function (err, person) {
      if (err)
        return res.status(500).send(err);

      if (!user)
        return res.status(404).send("No user found.");
    }
  );

  content = Content.findOne(
    { _id: req.body.content_id },
    '_id',
    function (err, content) {
      if (err)
        return res.status(500).send(err);

      if (!user)
        return res.status(404).send("No Content found.");
    }
  );

  if (req.body.rating > 5 && req.body.rating < 1)
      return res.status(500).send("Invalid Rating.");

  var new_rate = new Rate(
    {
      user: user._id,
      content: content._id,
      rating: req.body.rating
    }
  );

  new_rate.save(function(err, rate) {
    if (err)
      res.send(err);
    res.json({msg : "Thanks for the rate"});
  });
};
