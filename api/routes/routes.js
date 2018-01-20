'use strict';

module.exports = function(app) {
  var rate = require('../controllers/rateController');
  var content = require('../controllers/contentController');

  app.route('/rates')
    .post(rate.create_a_rate);

  app.route('/content')
    .post(content.show_a_content)
    .get(content.show_a_content);
};
