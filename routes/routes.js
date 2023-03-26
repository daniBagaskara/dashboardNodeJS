const express = require('express');
const router = express.Router();
const Auth = require("../controller/Auth.js");

router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.get('/register', Auth.register);

router.all('*', (req, res) => {
    res.status(404).send('404: Page not found');
});

module.exports = router;
