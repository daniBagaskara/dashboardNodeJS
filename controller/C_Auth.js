const path = require("path");
const mongoose = require("mongoose");
const User = require("../models/M_auth");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

  login(req, res) {
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
    const { name, email, password, confirmPassword } = req.body;

    if (
      validator.isEmpty(name) ||
      validator.isEmpty(email) ||
      validator.isEmpty(password) ||
      validator.isEmpty(confirmPassword)
    ) {
      return res
        .status(400)
        .json({ message: "Required Username, Email, and Password" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (!validator.isLength(password, { min: 6 })) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (!validator.equals(password, confirmPassword)) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      if (!createdUser) {
        return res.status(500).json({ message: "Failed to create user" });
      }

      return res
        .status(200)
        .json({
          message:
            "User created successfully,Contact your Admin to Activated your Account",
        });
    } catch (err) {
      if (err.code === 11000) {
        // Mongoose error code for duplicate key error
        res.status(400).json({ message: "Email already registered" });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  }

  async processLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({message:"Invalid email or password"});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({message:"Invalid username or password"});
    }

    if(user.status === false){
      return res.status(401).json({message:"Inactive account, please contact to activate your account."})
    }

    req.session.user = user;
    res.redirect("/");
  }
}

const object = new Auth();
module.exports = object;
