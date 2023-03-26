const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const path = require("path");

const app = express();
const port = 3000;

// Set view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('baseUrl', 'http://localhost:3000');

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static("./node_modules/bootstrap/dist/"));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
