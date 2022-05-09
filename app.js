const http = require("http");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const moment = require("moment");

const express = require("express");
const sequelize = require("./util/database");

const app = express();

const User = require("./models/user");
const Employee = require("./models/employee");

const mainRoute = require("./routes/main");
const authRoute = require("./routes/auth");

app.use(bodyParser.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(mainRoute);
app.use(authRoute);

app.use((error, req, res, next) => {
  return res
    .status(error.statusCode)
    .json({ message: error.message, status: "error" });
});

User.hasMany(Employee);
Employee.belongsTo(User, { constrains: true, onDelete: "CASCADE" });

sequelize
  .sync()
  .then(async (result) => {
    return User.findByPk(1);
  })
  .then(async (user) => {
    const hashedPassword = await bcrypt.hash("admin", 12);

    if (!user) {
      return User.create({
        name: "admin",
        username: "admin",
        password: hashedPassword,
      });
    }

    return user;
  })
  .then((user) => {
    http.createServer(app).listen(3000);
  })
  .catch((err) => {
    console.log('baba');
    console.log(err);
  });

module.exports = app;
