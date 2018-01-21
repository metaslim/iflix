let express = require('express');
let app = express();
let port = process.env.PORT || 3000;

let mongoose = require('mongoose');
let bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/rate_db');
}
else {
  mongoose.connect('mongodb://localhost/rate_test_one_db');
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./api/routes/routes');
routes(app);

app.listen(port);

console.log('Rate RESTful API server started on: ' + port);

module.exports = app;
