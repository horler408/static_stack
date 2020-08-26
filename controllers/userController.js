const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const { first_name, last_name, username, email, phone_number } = req.body;
  User.findOne({
    $or: [{ email: email }, { phone_number: phone_number }],
  }).then((oldUser) => {
    if (oldUser) {
      res.render("register", {
        error: "User already exists or invalid email address!",
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        phone_number: phone_number,
      });
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
          first_name,
          last_name,
          username,
          email,
          phone_number,
          password: hash,
        });
        user
          .save()
          .then((result) => {
            console.log(result);
            //res.render("login");
            res.render("success");
            res.status(200).json({
              message: "Signed up Successfully!",
            });
          })
          .catch((err) => {
            res.status(400).json({
              error: err,
            });
          });
      });
    }
  });
};

exports.login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone_number: username }] })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: new Error("No User Found!"),
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(404).json({
              error: new Error("Invalid Password!"),
            });
          }
          const token = jwt.sign({ name: user.name }, "23*&scfdhf)#@uet56(", {
            expiresIn: "1h",
          });
          res.render("dashboard", {
            user: user.first_name + " " + user.last_name,
            info: "",
          });
          res.status(200).json({
            message: "Login Successful!",
            token: token,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: "Password Do Not match",
          });
        });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Invalid Username or Password",
      });
    });
};

exports.deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "User Deleted Successfully!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.signin = (req, res) => {
  res.render("login", { info: "Welcome back, please log in" });
};
