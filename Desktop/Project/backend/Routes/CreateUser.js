const express = require("express");
const router = express.Router();
const user = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "My name is Manisha Jha";
const User = require("../models/User");

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await user
        .create({
          name: req.body.name,
          // password: req.body.password,  first write this and then use bcryptjs
          password: secPassword,
          email: req.body.email,
          location: req.body.location,
        })
        .then(() => {
          console.log("Successful.");
          return res.json({ success: true });
        })
        .catch((err) => {
          console.log(err);
          res.json({ error: "Please enter a unique value." });
        });
    } catch (error) {
      console.error(error.message);
    }
  }
);

router.post("/login", async (req, res) => {
  let email = req.body.email;
  console.log("testing");
  try {
    let userData = await user.findOne({ email });
    if (!userData) {
      return res
        .status(400)
        .json({ errors: "Try logging with correct credentials" });
    }
    const pwdCompare = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!pwdCompare) {
      return res
        .status(400)
        .json({ errors: "Try logging with correct credentials" });
    }
    const data = {
      user: {
        id: userData.id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);
    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});
module.exports = router;
