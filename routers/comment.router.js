const express = require("express");
const router = express.Router();

// middlewares
const { verifyToken } = require("../middlewares/jwt.token"); // verify token
const { rateLimiter } = require("../middlewares/rateLimit.middleware"); // rate limiter
const { authorizeRoles } = require("../middlewares/role.middleware"); // authorize roles

// controllers
const {
  createCommet,
  getAllComments,
  extractCommentData,
  editComment,
  deleteComment
} = require("../controllers/comment.controller");

// routes
//todo: create comment
//enpoint: http://localhost:5000/api/v1/comment/:ticketId/comments
router.post(
  "/:ticketId/comments",
  rateLimiter,
  verifyToken,
  authorizeRoles(["developer", "admin", "qa", "tester", "manager"]),
  createCommet
);

//todo: get all comments
//enpoint: http://localhost:5000/api/v1/comment/data
router.get(
  "/data",
  rateLimiter,
  verifyToken,
  authorizeRoles(["developer", "admin", "qa", "tester", "manager"]),
  getAllComments
);

//todo: extract the data from ticket model and user model which is related to comments
//enpoint: http://localhost:5000/api/v1/comment/extract
router.get("/extract", rateLimiter, verifyToken, extractCommentData);

//todo: edit comment
//enpoint: http://localhost:5000/api/v1/comment/edit/:commentId
router.put(
  "/edit/:commentId",
  verifyToken,
  authorizeRoles(["developer", "admin", "qa", "tester", "manager"]),
  editComment
);

//todo: delete comment
//enpoint: http://localhost:5000/api/v1/comment/delete/:commentId
router.delete(
  "/delete/:commentId",
  verifyToken,
  authorizeRoles(["developer", "admin", "qa", "tester", "manager"]),
  deleteComment
);

module.exports = router;
