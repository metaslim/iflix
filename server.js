var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var ContentStat = require('./api/models/content_statModel');
var Content = require('./api/models/contentModel');
var Rate = require('./api/models/rateModel');
var User = require('./api/models/userModel');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rate_db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);

console.log('Rate RESTful API server started on: ' + port);
