const path = require('path');
class Auth {
 register(req, res) {
        const baseUrl = req.app.get('baseUrl');
        const data = {
            title: 'Login Page',
            message: 'Welcome to our website!',
            baseUrl: baseUrl,
            error: null,
        };
        res.render('register', data);
    }
}

const object = new Auth();
module.exports = object;