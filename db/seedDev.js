// require the sequelize from init.js
const { sequelize, connectDB } = require("./init");

const User = require("../models/User.model"); // user model
const Ticket = require("../models/Ticket.model"); // ticket model
const TicketAssignment = require("../models/TicketAssignment.model"); // ticket assignment model
const Comment = require("../models/Comment.model");
const Attachment = require("../models/Attachment.model");

// dummy data for models
const userData = [
  {
    name: "John Doe",
    email: "k9V9o@example.com",
    password: "john12345",
    role: "developer",
  },
  {
    name: "Jane Doe",
    email: "5Tb4i@example.com",
    password: "jane12345",
    role: "admin",
  },
  // new user
  {
    name: "danny",
    email: "danny@example.com",
    password: "danny12345",
    role: "developer",
  },
  {
    name: "santosh",
    email: "s1Ft8@example.com",
    password: "santosh12345",
    role: "admin",
  },
];

// seed function
const seedDev = async () => {
  try {
    // connect to database
    await connectDB(); // connect to the database
    console.log("Database connected");

    // models sync the dummy data model.sync({force : true}) to the database;
    await User.sync({ force: false }); // true : drop the table if it already exists
    console.log("User table created successfully...");

    await Ticket.sync({ force: false }); // true : drop the table if it already exists
    console.log("Ticket table created successfully...");

    await TicketAssignment.sync({ force: false }); // true : drop the table if it already exists
    console.log("TicketAssignment table created successfully...");

    await Comment.sync({ force: false }); // true : drop the table if it already exists
    console.log("Comment table created successfully...");

    await Attachment.sync({ force: true }); // true : drop the table if it already exists
    console.log("Attachment table created successfully...");
    process.exit(0); // exit the process
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedDev();
