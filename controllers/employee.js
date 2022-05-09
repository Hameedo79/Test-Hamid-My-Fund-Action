const Employee = require("../models/employee");
const { validationResult } = require("express-validator/check");

exports.getEmployees = async (req, res, next) => {
  try {
    const data = await Employee.findAll();

    if (Object.entries(data).length != 0) {
      const arr = [];
      for (const i in data) {
        arr.push(data[i].dataValues);
      }

      return res.status(200).json({ data: arr, status: "success" });
    } else {
      const error = new Error("Data not found");
      error.statusCode = 404;
      return next(error);
    }
  } catch (err) {
    console.log(err);

    const error = new Error(
      "Something went wrong. Please contact the administrator"
    );
    error.statusCode = 500;
    return next(error);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await Employee.findByPk(id);

    if (data) {
      return res.status(200).json({ data: data.dataValues, status: "success" });
    } else {
      const error = new Error("Data not found");
      error.statusCode = 404;
      return next(error);
    }
  } catch (err) {
    console.log(err);

    const error = new Error(
      "Something went wrong. Please contact the administrator"
    );
    error.statusCode = 500;
    return next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let messages = "";
    for (var i = 0; i < errors.array().length; i++) {
      messages = messages + "" + errors.array()[i].msg;

      if (parseInt(errors.array().length) - parseInt(i) !== 1) {
        messages = messages + ", ";
      }
    }
    const error = new Error(messages);
    error.statusCode = 422;
    return next(error);
  }

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  const country = req.body.country;
  const city = req.body.city;
  const position = req.body.position;

  try {
    const data = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      country: country,
      city: city,
      position: position,
      userId: req.userId,
    };

    const getEmployee = await Employee.findOne({
      where: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    if (getEmployee) {
      const error = new Error("Employee already exists");
      error.statusCode = 401;
      return next(error);
    }

    await Employee.create(data);
    message = "Successfully created a new employee";

    res.status(201).json({ message: message, status: "success" });
  } catch (err) {
    console.log(err);

    const error = new Error(
      "Something went wrong. Please contact the administrator"
    );
    error.statusCode = 500;
    return next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let messages = "";
    for (var i = 0; i < errors.array().length; i++) {
      messages = messages + "" + errors.array()[i].msg;

      if (parseInt(errors.array().length) - parseInt(i) !== 1) {
        messages = messages + ", ";
      }
    }
    const error = new Error(messages);
    error.statusCode = 422;
    return next(error);
  }

  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  const country = req.body.country;
  const city = req.body.city;
  const position = req.body.position;

  try {
    const getEmployee = await Employee.findByPk(id);

    if (getEmployee === null) {
      const error = new Error("Employee not found");
      error.statusCode = 404;
      return next(error);
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      country: country,
      city: city,
      position: position,
    };

    await Employee.update(data, { where: { id: id } });
    message = "Successfully updated employee detail";

    res.status(201).json({ message: message, status: "success" });
  } catch (err) {
    console.log(err);

    const error = new Error(
      "Something went wrong. Please contact the administrator"
    );
    error.statusCode = 500;
    return next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let messages = "";
    for (var i = 0; i < errors.array().length; i++) {
      messages = messages + "" + errors.array()[i].msg;

      if (parseInt(errors.array().length) - parseInt(i) !== 1) {
        messages = messages + ", ";
      }
    }
    const error = new Error(messages);
    error.statusCode = 422;
    return next(error);
  }

  try {
    const getEmployee = await Employee.findByPk(id);

    if (getEmployee === null) {
      const error = new Error("Employee not found");
      error.statusCode = 404;
      return next(error);
    }

    await Employee.destroy({ where: { id: id } });

    res
      .status(201)
      .json({ message: "Successfully deleted employee", status: "success" });
  } catch (err) {
    console.log(err);

    const error = new Error(
      "Something went wrong. Please contact the administrator"
    );
    error.statusCode = 500;
    return next(error);
  }
};
