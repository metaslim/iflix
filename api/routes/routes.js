'use strict';

module.exports = (app) => {
  const rate = require('../controllers/rate');
  const content = require('../controllers/content');

  app.route('/rating')
    .post(rate.createRating);

  app.route('/content')
    .post(content.showContent);
};
