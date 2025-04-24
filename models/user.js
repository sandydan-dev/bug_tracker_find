const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // not null constraint
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
