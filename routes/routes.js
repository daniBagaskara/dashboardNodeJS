const express = require('express');
const router = express.Router();
const Auth = require("../controller/Auth.js");
const Dashboard = require("../controller/Dashboard.js");

router.get('/', Dashboard.index);

router.get('/register', Auth.register);

router.all('*', (req, res) => {
    res.status(404).send('404: Page not found');
});

module.exports = router;
