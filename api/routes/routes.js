'use strict';

module.exports = function(app) {
  let rate = require('../controllers/rate');
  let content = require('../controllers/content');

  app.route('/rating')
    .post(rate.createRating);

  app.route('/content')
    .post(content.showContent);
};
