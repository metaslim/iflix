const express = require('express');
const app = express();
const config = require('config');
const routes = require('./app/routes');
const init = require('./init/init');

init(app);
routes(app);

app.listen(config.port);

console.log('Rate RESTful API server started on: ' + config.port);

module.exports = app;
