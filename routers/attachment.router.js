const express = require("express");
const router = express.Router();

// middlewares
const { verifyToken } = require("../middlewares/jwt.token"); // verify token
const { rateLimiter } = require("../middlewares/rateLimit.middleware"); // rate limiter
const { authorizeRoles } = require("../middlewares/role.middleware"); // authorize roles
const { upload } = require("../middlewares/upload"); // upload middleware

// multiple files upload
const uploadFiles = upload.array("files", 10); // limit to 5 files

// controllers
const {
  uploadAttachment,
  deleteAttachment,
} = require("../controllers/attachment.controller");

// routes
//todo: create attachment
//enpoint: http://localhost:5000/api/v1/attachment/:ticketId/attachments/comment/:commentId
// endpoint: http://localhost:5000/api/v1/attachment/1/attachments/comment/1
router.post(
  "/:ticketId/attachments/comment/:commentId",
  rateLimiter,
  verifyToken,
  authorizeRoles(["developer", "admin", "qa", "tester", "manager"]),
  uploadFiles,
  uploadAttachment
);

//todo: delete attachment
//enpoint: http://localhost:5000/api/v1/attachment/delete/:attachmentId
router.delete(
  "/delete/:attachmentId",
  verifyToken,
  authorizeRoles(["developer", "admin", "qa", "tester", "manager"]),
  deleteAttachment
);

module.exports = router;
