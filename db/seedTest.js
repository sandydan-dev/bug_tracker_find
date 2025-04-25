// require the sequelize from init.js
const { sequelize, connectDB } = require("./init");

// bcrypt

// require the models
const User = require("../models/User.model");

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
  {
    name: "kamal",
    email: "kamal@gmail.com",
    password: "kamal12345",
    role: "developer",
  },
];

// seed test function
const seedTest = async () => {
  try {
    // connect to database
    await connectDB(); // connect to the database
    console.log("Database connected");

    // models sync the dummy data model.sync({force : true}) to the database;

    //todo: User table should not be dropped
    await User.sync({ force: true }); // true : drop the table if it already exists
    console.log("User table created");

    // seed the database with dummy data
    await User.bulkCreate(userData);
    console.log("User table seeded with dummy data");

    process.exit(0); // exit the process
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedTest();
