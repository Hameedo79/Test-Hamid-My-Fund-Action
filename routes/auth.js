const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");

const authController = require("../controllers/auth");

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username cannot be empty"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ],
  authController.login
);

module.exports = router;
