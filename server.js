const express = require('express');
const app = express();
const port = 3000;
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

mongoose.connect(config.DBHost);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/routes');
routes(app);

app.listen(port);

console.log('Rate RESTful API server started on: ' + port);

module.exports = app;
