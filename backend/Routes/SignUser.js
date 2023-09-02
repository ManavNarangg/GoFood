const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "abcdefghijklmnopqrstuvwxyzabcdef"; //random 32 bits
const { body, matchedData, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    body("email").trim().isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Password not valid").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req); //returns validation errors
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);
    try {
      const user = new User({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: securePassword,
      });
      await user.save();
      res.json({ message: "Created Successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").trim().isEmail(),
    body("password", "incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Incorrect email" });
      }
      const passCompare = await bcrypt.compare(req.body.password, userData.password)
      if (!passCompare) {
        return res.status(400).json({ errors: "Incorrect password" });
      }
      //This data below is the data that you pass in jwt.sign() function as a payload 
      const data = {
          id: userData.id
      };
      const authToken = jwt.sign(data, jwtSecret, {expiresIn: 86400});
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.error(error);
      res.json({ message: "An error occured" });
    }
  }
);

module.exports = router;
