const Profile = require("../models/profile");
const fs = require("fs");

exports.index = (req, res, next) => {
  Profile.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

exports.createProfile = (req, res, next) => {
  //req.body.profile = JSON.parse(req.body.profile);
  const url = req.protocol + "://" + req.get("host");
  const profile = new Profile({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    age: req.body.age,
    image: url + "/images/" + req.file.filename,
  });
  profile
    .save()
    .then(() => {
      res.json({
        message: "Profile Created Successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "Profile Creation Failed",
      });
    });
};

exports.getProfile = (req, res, next) => {
  Profile.findOne({ userId: req.body.id })
    .then((profile) => {
      res.json(profile);
    })
    .catch((error) => {
      res.json({
        message: "Invalid User",
      });
    });
};

exports.updateProfile = (req, res, next) => {
  let userId = req.body.userId;
  let updatedData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    age: req.body.age,
  };
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    updatedData.image = url + "/images/" + req.file.filename;
  }
  Profile.findByIdAndUpdate(userId, { $set: updatedData })
    .then(() => {
      res.json({
        message: "User Updated Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "Profile Update Failed!",
      });
    });
};

exports.deleteProfile = (req, res, next) => {
  Profile.findOne({ userId: req.body.id }).then((profile) => {
    const filename = profile.image.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Profile.deleteOne({ userId: req.body.id })
        .then(() => {
          res.json({
            message: "Profile Deleted Successfully!",
          });
        })
        .catch((error) => {
          res.json({
            message: "Profile Cannot be Deleted! ",
          });
        });
    });
  });
};
