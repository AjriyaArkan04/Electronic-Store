const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// REGISTER USER (BARU)
router.post('/register', AuthController.register);

// LOGIN USER + ADMIN
router.post('/login', AuthController.login);

module.exports = router;