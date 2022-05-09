const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Employee = sequelize.define("employee", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  address: Sequelize.STRING,
  country: Sequelize.STRING,
  city: Sequelize.STRING,
  position: Sequelize.STRING,
  active: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Employee;
