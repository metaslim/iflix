'use strict';

const rate = require('./controllers/rate/routes');
const content = require('./controllers/content/routes');

module.exports = (app) => {
  app.use('/rating', rate)
  app.use('/content', content)
};
