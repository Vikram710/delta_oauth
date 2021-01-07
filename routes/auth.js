const express = require('express');
const router = express.Router();
const {register, login, generateCode, generateToken} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login, generateCode);
router.post('/get_access_token', generateToken);

module.exports = router;
