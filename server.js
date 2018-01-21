let express = require('express');
let app = express();
let port = 3000;
let config = require('config');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

mongoose.connect(config.DBHost);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./api/routes/routes');
routes(app);

app.listen(port);

console.log('Rate RESTful API server started on: ' + port);

module.exports = app;
