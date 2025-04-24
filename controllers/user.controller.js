const User = require("../models/user");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const error = signupValidator(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while signing up",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
};
