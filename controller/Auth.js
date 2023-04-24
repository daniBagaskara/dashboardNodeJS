const path = require("path");
const mongoose = require("mongoose");
const User = require("../models/M_auth");
const bcrypt = require('bcrypt');

class Auth {
  register(req, res) {
    const baseUrl = req.app.get("baseUrl");
    const data = {
      title: "Register Page",
      baseUrl: baseUrl,
      error: null,
      layout: "../views/layout/auth-layout.ejs",
    };
    res.render("register", data);
  }

  login(req,res){
    const baseUrl = req.app.get("baseUrl");
    const data = {
      title: "Login Page",
      baseUrl: baseUrl,
      error: null,
      layout: "../views/layout/auth-layout.ejs",
    };
    res.render("login", data);
  }
  
  async processRegister(req, res) {
    const { name, email, password } = req.body;
  
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
  
    if (!createdUser) {
      return res.status(500).json({ message: 'Failed to create user' });
    }
  
    return res.status(200).json({ message: 'User created successfully' });
  }
}

const object = new Auth();
module.exports = object;
