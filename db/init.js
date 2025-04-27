const { Sequelize } = require("sequelize");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT, // "sqlite" database type in this case
  storage: path.resolve(__dirname, process.env.DB_STORAGE),
  // logging: process.env.NODE_ENV !== "test", // enable logging only in non-test environments
});

const connectDB = async () => {
  try {
    // authentication to the database
    await sequelize.authenticate(); // test the connection to the database, trying to authenticate
    console.log(
      "Connection has been established successfully :",
      process.env.NODE_ENV
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  connectDB,
};
