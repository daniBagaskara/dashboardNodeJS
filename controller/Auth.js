const path = require('path');
class Auth {
    async register(req, res) {
        const baseUrl = req.app.get('baseUrl');
        const data = {
            title: 'Login Page',
            message: 'Welcome to our website!',
            baseUrl: baseUrl,
            error: null,
        };
        res.render(path.join(__dirname, '../views/register.ejs'), data);
    }
}

const object = new Auth();
module.exports = object;