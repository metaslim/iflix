const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const routes = require('./app/routes');
const extend = require('./app/extend');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbHost);

extend(app);
routes(app);

app.listen(config.port);

console.log('Rate RESTful API server started on: ' + config.port);

module.exports = app;
