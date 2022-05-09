const Sequelize = require("sequelize");

const sequelize = new Sequelize("testHamid", "postgres", "alafunan", {
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
});

module.exports = sequelize;
