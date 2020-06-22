const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

/* Register user route */
router.post("/userreg", (req, res) => {
  console.log(req.body);
  console.log("here");
  User.findOne({ Email: req.body.Email }).then((user) => {
    if (user) {
      return res.json("Email already exists");
    } else {
      const newUser = new User({
        Email: req.body.Email,
        Password: req.body.Password,
        Name: req.body.Name,
        Designation: req.body.Designation,
      });
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    }
  });
});

/* Login user route */
router.post("/userlogin", (req, res) => {
  console.log(req.body);
  const Email = req.body.email;
  const Password = req.body.password;
  User.findOne({ Email: Email, Password: Password }).then((user) => {
    if (!user) {
      return res.json("ID not found");
    }
    res.json({ ID: user._id });
  });
});

/* Update user route */
router.post("/userupdate", (req, res) => {
  console.log(req.body);
  User.updateOne(
    { _id: req.body.id },
    {
      Name: req.body.Name,
      Password: req.body.Password,
      Designation: req.body.Designation,
      Email: req.body.Email,
    },
    function (err, r) {
      if (err) {
        res.json("User not found.");
      } else res.json("User updated successfully");
    }
  );
});

/* Find user */
router.post("/getuser", (req, res) => {
  User.findOne({ _id: req.body.id }).then((user) => {
    if (!user) {
      res.json("Requests not found!");
    }
    res.json(user);
  });
});

module.exports = router;
