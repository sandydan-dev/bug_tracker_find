const express = require("express");
const router = express.Router();

// middlewares
const { verifyToken } = require("../middlewares/jwt.token"); // verify token
const { rateLimiter } = require("../middlewares/rateLimit.middleware"); // rate limiter
const { authorizeRoles } = require("../middlewares/role.middleware"); // authorize roles

// controllers




module.exports = router;
