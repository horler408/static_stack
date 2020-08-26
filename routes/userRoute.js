const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const multer = require("../middlewares/multer");

router.post("/register", multer, userController.signup);
router.post("/login", userController.login);
router.get("/signin", userController.signin);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
