const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware.js');
const sessionMiddleware = require('../middleware/sessionMiddleware.js');
const Auth = require("../controller/C_Auth.js");
const Dashboard = require("../controller/Dashboard.js");

router.get('/', authMiddleware,Dashboard.index);

router.get('/register', sessionMiddleware,Auth.register);
router.post('/register', Auth.processRegister);
router.get('/login', sessionMiddleware,Auth.login);
router.post('/login',Auth.processLogin);

router.all('*', (req, res) => {
    res.status(404).send('404: Page not found');
});

module.exports = router;
