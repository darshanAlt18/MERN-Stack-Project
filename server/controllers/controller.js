const User = require('../models/RegistrationModel');
const Contact = require('../models/contactModel');
const bcrypt = require('bcryptjs');

const home = async (req, res, next) => {
  try {
    await res.status(200).send("Welcome to Home Page!!");
  } catch (error) {
    next(error);
  }
}

const about = async (req, res, next) => {
  try {
    await res.status(200).send("Welcome to About Page!!");
  } catch (error) {
    next(error);
  }
}

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username Already Exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ username, email, hashedPassword });
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const token = await newUser.generateToken();
    res.status(201).json({
      message: "User Registration Successfully",
      token,
      userId: newUser._id.toString()
    });
  } catch (error) {
    next(error);
  }
}

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password.Please Try Again!!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Username or Password.Please Try Again!!" });
    }

    const token = await user.generateToken();
    res.status(200).json({
      message: "Login Successfully",
      token,
      userId: user._id.toString()
    });
  } catch (error) {
    next(error);
  }
}

const contactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({
      Message: "Your Message has been Submitted Successfully!!",
      contactId: newContact._id.toString()
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { home, about, register, login, contactForm };