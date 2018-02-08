'use strict';

const bodyParser = require('body-parser');
const db = require('./db');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
