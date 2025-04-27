const express = require("express");
const router = express.Router();

// middlewares
const { rateLimiter } = require("../middlewares/rateLimit.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const { verifyToken } = require("../middlewares/jwt.token");

const asyncHandler = require("../helplers/asyncHandler");

// controllers
const {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByName,
  sortUsers,
} = require("../controllers/user.controller");

// routes
//todo: signup
//enpoint: http://localhost:5000/api/v1/users/signup
router.post("/signup", asyncHandler(signup));

//todo: login
//enpoint: http://localhost:5000/api/v1/users/login
router.post("/login", rateLimiter, asyncHandler(login));

//todo: get all users
//enpoint: http://localhost:5000/api/v1/users/data
router.get(
  "/data",
  verifyToken,
  authorizeRoles(["admin", "manager", "qa", "tester", "developer"]),
  asyncHandler(getAllUsers)
);

// todo: get user by id
// enpoint: http://localhost:5000/api/v1/users/data/:id
router.get(
  "/data/:id",
  verifyToken,
  authorizeRoles(["admin", "manager", "qa", "tester", "developer"]),
  asyncHandler(getUserById)
);

// todo: update user
// enpoint: http://localhost:5000/api/v1/users/data/:id
router.put(
  "/update/:id",
  verifyToken,
  authorizeRoles(["admin", "manager", "qa", "tester", "developer"]),
  updateUser
);

// todo: delete user
// enpoint: http://localhost:5000/api/v1/users/data/:id
router.delete("/delete/:id", verifyToken, deleteUser);

// todo: find user by name
// enpoint: http://localhost:5000/api/v1/users/find/:name
router.get("/find/:name", rateLimiter, verifyToken, findUserByName);

// todo: sort users
// enpoint: http://localhost:5000/api/v1/users/sort/:order
router.get("/sort/:order", verifyToken, rateLimiter, sortUsers);

module.exports = router;
