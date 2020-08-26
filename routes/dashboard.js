const router = require("express").Router();
const User = require("../models/user");

const authCheck = (req, res, next) => {
  User.findOne({ id: req.body.id })
    .then((user) => {
      if (!user) {
        res.render("login", { error: "You must log in to view this page" });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "Error Occured!",
      });
    });
};

router.get("/", authCheck, (req, res) => {
  res.render("dashboard", {
    info: "You are not authorized to view this page",
    user: "",
  });
});

module.exports = router;
