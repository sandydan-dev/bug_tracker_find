const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { sequelize } = require("./db/init");

sequelize
  .authenticate()
  // .then(() => {
  //   console.log("Connection has been established successfully.");
  // })
  // .catch((error) => {
  //   console.error("Unable to connect to the database:", error);
  // });

// routes path
const userRoute = require("./routers/user.router");

// middlewares
app.use(express.json()); // to get data from body
app.use(cookieParser()); // to get data from cookies
app.use(cors()); // to allow cross-origin requests
app.use(express.urlencoded({ extended: false })); // to get data from form

// test routes
app.get("/test", (req, res) => {
  res.send("Hellow World!");
});

// main routes

//todo: user routes
app.use("/api/v1/users", userRoute);

module.exports = app;
