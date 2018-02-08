'use strict';

module.exports = (app) => {
  const rate = require('./controllers/rate/routes');
  const content = require('./controllers/content/routes');

  app.use('/rating', rate)
  app.use('/content', content)
};
