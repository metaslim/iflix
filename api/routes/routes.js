'use strict';

module.exports = function(app) {
  var rate = require('../controllers/rate');
  var content = require('../controllers/content');

  app.route('/rates')
    .post(rate.create_rating);

  app.route('/content')
    .post(content.show_content);
};
