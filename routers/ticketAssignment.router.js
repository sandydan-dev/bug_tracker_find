const express = require("express");
const router = express.Router();

// middlewares
const { verifyToken } = require("../middlewares/jwt.token"); // verify token
const { rateLimiter } = require("../middlewares/rateLimit.middleware"); // rate limiter
const { authorizeRoles } = require("../middlewares/role.middleware"); // authorize roles

const {
  createTicketAssigment,
  getTicketsAssignedToDeveloper,
  updateTicketStatus,
  deleteTicketAssignment
} = require("../controllers/ticketAssignment.controller");

// routes
//todo: create ticket assignment
//enpoint: http://localhost:5000/api/v1/ticket_assignment/create?ticketId=1
router.get("/create", rateLimiter, verifyToken, createTicketAssigment);

// todo: get tickets assigned to developer
// enpoint: http://localhost:5000/api/v1/ticket_assignment/my_assigned_tickets
router.get(
  "/my_assigned_tickets",
  rateLimiter,
  verifyToken,
  authorizeRoles(["developer", "admin", "manager", "qa", "tester"]),
  getTicketsAssignedToDeveloper
);

// todo: update ticket status
// enpoint: http://localhost:5000/api/v1/ticket_assignment/update/status/:ticketId
router.put(
  "/update/status/:ticketId",
  rateLimiter,
  verifyToken,
  authorizeRoles(["developer", "admin", "manager", "qa", "tester"]),
  updateTicketStatus
);

// todo: delete ticket assignment
// enpoint: http://localhost:5000/api/v1/ticket_assignment/delete/:ticketAssignmentId
router.delete(
  "/delete/:ticketAssignmentId",
  rateLimiter,
  verifyToken,
  authorizeRoles(["developer", "admin", "manager", "qa", "tester"]),
  deleteTicketAssignment
);
module.exports = router;
