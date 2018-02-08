'use strict';
const rate = require('./controllers/rate/routes');
const content = require('./controllers/content/routes');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.use('/rating', rate)
  app.use('/content', content)
};
