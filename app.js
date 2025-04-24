const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// routes path

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

module.exports = app;
