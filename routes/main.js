const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator/check");

const employeeController = require("../controllers/employee");

router.get("/getEmployees", isAuth, employeeController.getEmployees);
router.get("/getEmployee/:id", isAuth, employeeController.getEmployee);
router.post(
  "/createEmployee",
  isAuth,
  [
    body("firstName")
      .notEmpty()
      .withMessage("First Name cannot be empty")
      .matches(/^[A-Za-z ]+$/)
      .withMessage("First Name can only contain alphabet"),
    body("lastName")
      .notEmpty()
      .withMessage("Last Name cannot be empty")
      .matches(/^[A-Za-z ]+$/)
      .withMessage("Last Name can only contain alphabet"),
    body("address")
      .notEmpty()
      .withMessage("Address cannot be empty")
      .matches(/^[A-Za-z0-9 ]+$/)
      .withMessage("Address can only contain alphanumeric"),
    body("country")
      .optional({ checkFalsy: true })
      .matches(/^[A-Za-z ]+$/)
      .withMessage("Country can only contain alphabet"),
    body("city")
      .optional({ checkFalsy: true })
      .matches(/^[A-Za-z ]+$/)
      .withMessage("City can only contain alphabet"),
    body("position")
      .notEmpty()
      .withMessage("Last Name cannot be empty")
      .matches(/^[A-Za-z ]+$/)
      .withMessage("Last Name can only contain alphabet"),
  ],
  employeeController.createEmployee
);
router.patch(
  "/updateEmployee",
  isAuth,
  [
    body("id").notEmpty().withMessage("Employee ID cannot be empty"),
    body("firstName")
      .notEmpty()
      .withMessage("First Name cannot be empty")
      .matches(/^[A-Za-z ]+$/)
      .withMessage("First Name can only contain alphabet"),
    body("lastName")
      .notEmpty()
      .withMessage("Last Name cannot be empty")
      .matches(/^[A-Za-z ]+$/)
      .withMessage("Last Name can only contain alphabet"),
    body("address")
      .notEmpty()
      .withMessage("Address cannot be empty")
      .matches(/^[A-Za-z0-9 ]+$/)
      .withMessage("Address can only contain alphanumeric"),
    body("country")
      .optional({ checkFalsy: true })
      .matches(/^[A-Za-z ]+$/)
      .withMessage("Country can only contain alphabet"),
    body("city")
      .optional({ checkFalsy: true })
      .matches(/^[A-Za-z ]+$/)
      .withMessage("City can only contain alphabet"),
    body("position")
      .notEmpty()
      .withMessage("Last Name cannot be empty")
      .matches(/^[A-Za-z ]+$/)
      .withMessage("Last Name can only contain alphabet"),
  ],
  employeeController.updateEmployee
);
router.delete("/deleteEmployee/:id", isAuth, employeeController.deleteEmployee);

module.exports = router;
