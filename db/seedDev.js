// require the sequelize from init.js
const { sequelize, connectDB } = require("./init");

const User = require("../models/user");

// dummy data for models
const userData = [
  {
    name: "John Doe",
    email: "k9V9o@example.com",
  },
  {
    name: "Jane Doe",
    email: "5Tb4i@example.com",
  }
];

// seed function
const seedDev = async () => {
  try {
    // connect to database
    await connectDB(); // connect to the database
    console.log("Database connected");

    // models sync the dummy data model.sync({force : true}) to the database;
    await User.sync({ force: true });
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

seedDev();
