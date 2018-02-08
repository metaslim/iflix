'use strict';

const express = require('express');
const router = express.Router();
const content = require('./controller');
router.post('/', content.showContent);

module.exports = router;
