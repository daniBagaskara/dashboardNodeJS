const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const path = require("path");

const app = express();
const port = 3000;

require("./utils/db.js");

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("baseUrl", "http://localhost:3000");

// Parse form data
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
