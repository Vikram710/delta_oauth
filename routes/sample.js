const express = require('express');
const router = express.Router();
const {sample} = require('../controllers/sampleController');

router.get('/', sample);

module.exports = router;
