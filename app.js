const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { sequelize } = require("./db/init");

sequelize.authenticate();
// .then(() => {
//   console.log("Connection has been established successfully.");
// })
// .catch((error) => {
//   console.error("Unable to connect to the database:", error);
// });

// routes path
const userRoute = require("./routers/user.router"); // user routes
const ticketRoute = require("./routers/ticket.router"); // ticket routes
const ticketAssignmentRoute = require("./routers/ticketAssignment.router"); // ticket assignment routes
const commentRoute = require("./routers/comment.router"); // comment routes
const attachmentRouter = require("./routers/attachment.router")

// middlewares
app.use(express.json()); // to get data from body
app.use(cookieParser()); // to get data from cookies
app.use(cors()); // to allow cross-origin requests
app.use(express.urlencoded({ extended: true })); // to get data from form

app.use('/uploads', express.static('uploads'));

// test routes
app.get("/test", (req, res) => {
  res.send("Hellow World!");
});

// main routes

//todo: user routes
app.use("/api/v1/users", userRoute);

//todo: ticket routes
app.use("/api/v1/ticket", ticketRoute);

//todo: ticket assignment routes
app.use("/api/v1/ticket_assignment", ticketAssignmentRoute);

//todo: comment routes
app.use("/api/v1/comment", commentRoute);

//todo: attachment routes
app.use("/api/v1/attachment", attachmentRouter)

module.exports = app;
