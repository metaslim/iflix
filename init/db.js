'use strict';

const config = require('config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbHost);

module.exports = mongoose;
