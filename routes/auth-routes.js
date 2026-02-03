const express = require("express");
const authControllers = require("../controllers/auth-controllers");


const router = express.Router();



router.post('/register', authControllers.register);
router.get('/verify-user/:code', authControllers.verifyAccount);
router.post('/login', authControllers.login);
router.post('/resend-verification-code', authControllers.resendVerification);

module.exports = router;