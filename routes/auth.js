const express = require('express');
const router = express.Router();
const {register, login, generateCode, generateToken, showLogin} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login, generateCode);
router.post('/get_access_token', generateToken);
router.get('/show_login', showLogin)

module.exports = router;
