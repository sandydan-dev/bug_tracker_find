const jwt = require("jsonwebtoken");
require("dotenv").config();

// generate token
const generateToken = (payload) => {
  try {
    if (!payload) {
      throw new Error("Payload is required");
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });
    // if token is not created then throw error
    if (!token) {
      throw new Error("Token not created");
    }

    return token;
  } catch (error) {
    return { message: "Error while generating token", error: error };
  }
};

// verify token middleware
const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1] ||
    req.headers.token ||
    req.cookies.token;

  console.log("Received token: ", token);

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  try {
    // decoded
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // debugging log
    console.log(" Error while verifying token", error);

    // jwt name token error
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    // if name token expires
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(500).json({ message: "Error while verifying token" });
  }
};

module.exports = { generateToken, verifyToken };


// login
// const token = generateToken({
//     id: user._id,
//     email: user.email,
//     role: user.role,
//   }); // your custom token logic

//   // set token as cookies
//   res.cookie("token", token, {
//     httpOnly: true, // can't access from JS
//     secure: true, // only over HTTPS (false in dev)
//     sameSite: "strict", // CSRF protection
//     maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
//   });

//   // also set token in headers
//   res.setHeader("Authorization", `Bearer ${token}`);