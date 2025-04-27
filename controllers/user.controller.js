const User = require("../models/User.model");
// require Op from Sequelize or sequelize
const { Op } = require("sequelize");

// middleware for generate token
const { generateToken } = require("../middlewares/jwt.token");

const {
  signupValidator,
  loginValidator,
} = require("../validators/signupValidation");

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const error = signupValidator({ name, email, password });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // if user already exist
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // create user
    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while signing up",
      error: error.message,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate user
    const error = loginValidator({ email, password });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // check user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found, Please signup first",
      });
    }

    // check password if password is correct
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // set token as cookies
    res.cookie("token", token, {
      httpOnly: true, // can't access from JS
      secure: true, // only over HTTPS (false in dev)
      sameSite: "strict", // CSRF protection
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    });

    // also set token in headers
    res.setHeader("Authorization", `Bearer ${token}`);

    // login success
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      loggedInUser: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging in",
      error: error.message,
    });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll();

    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All users",
      users: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while getting all users",
      error: error.message,
    });
  }
};

// get user by id

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while getting user by id",
      error: error.message,
    });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // set to update
    const updateData = await user.set(userData);

    if (!updateData) {
      return res.status(400).json({
        success: false,
        message: "Error while updating user",
      });
    }
    // save data
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating user",
      error: error.message,
    });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // delete user
    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting user",
      error: error.message,
    });
  }
};

// find user by name
const findUserByName = async (req, res) => {
  try {
    const name = req.params.name;
    // make it case insensitive

    const user = await User.findOne({
      // case insensitive
      where: { name: name },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User name not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting user by name",
      error: error.message,
    });
  }
};

// asc order , desc order
const sortUsers = async (req, res) => {
  try {
    const order = req.params.order;
    const users = await User.findAll({ order: [["name", order]] });

    if (!users) {
      return res.status(400).json({
        success: false,
        message: "Users not found",
      });
    }

    if (order === "asc") {
      return res.status(200).json({
        success: true,
        message: "Users found in ascending order (a to z)",
        users: users,
      });
    }

    if (order === "desc") {
      return res.status(200).json({
        success: true,
        message: "Users found in descending order (z to a)",
        users: users,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while sorting users",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByName,
  sortUsers,
};
