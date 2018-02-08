const express = require('express');
const app = express();
const config = require('config');
const dispacth = require('./app/dispatch');
const init = require('./init/init');

init(app);
dispacth(app);

app.listen(config.port);

console.log('Rate RESTful API server started on: ' + config.port);

module.exports = app;
