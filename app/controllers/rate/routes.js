'use strict';

const express = require('express');
const router = express.Router();
const rate = require('./controller');
router.post('/', rate.createRating);

module.exports = router;
