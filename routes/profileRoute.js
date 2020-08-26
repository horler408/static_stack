const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const upload = require("../middlewares/multer");
const authenticate = require("../middlewares/auth");

router.post("/", authenticate, upload, profileController.createProfile);
router.post("/single", authenticate, profileController.getProfile);
router.get("/", authenticate, profileController.index);
router.post("/update", upload, profileController.updateProfile);
router.post("/delete", authenticate, profileController.deleteProfile);

module.exports = router;
