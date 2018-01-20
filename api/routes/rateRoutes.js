'use strict';

module.exports = function(app) {
  var rate = require('../controllers/rateController');

  app.route('/rates')
    .post(rate.create_a_rate);
};
