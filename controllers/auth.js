const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

exports.login = async (req, res, next) => {
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

  const username = req.body.username;
  const password = req.body.password;

  try {
    const getUser = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!getUser) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      return next(error);
    }

    const checkPassword = bcrypt.compareSync(
      password,
      getUser.dataValues.password
    );

    if (!checkPassword) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      return next(error);
    }

    const payload = {
      userId: getUser.dataValues.id,
      username: getUser.dataValues.username,
      iat: 1516234022,
    };

    var token = jwt.sign(payload, "shhhhh");

    return res.status(200).json({ status: "success", token: token });
  } catch (err) {
    console.log(err);

    const error = new Error(
      "Something went wrong. Please contact the administrator"
    );
    error.statusCode = 500;
    return next(error);
  }
};
