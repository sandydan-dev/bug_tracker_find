const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/jwt.token");
const { rateLimiter } = require("../middlewares/rateLimit.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
// controllers
const {
  createTicket,
  getAllTickets,
  getTicketById,
  getUnAssignedTicket,
  updateTicket,
} = require("../controllers/ticket.controller");

// routes
//todo: create ticket
//enpoint: http://localhost:5000/api/v1/ticket/create
router.post("/create", verifyToken, createTicket);

//todo: get all tickets
//enpoint: http://localhost:5000/api/v1/ticket/data
router.get("/data", verifyToken, rateLimiter, getAllTickets);

//todo: get ticket by id
//enpoint: http://localhost:5000/api/v1/ticket/data/:id
router.get("/data/:id", verifyToken, rateLimiter, getTicketById);

//todo: get unassigned tickets
//enpoint: http://localhost:5000/api/v1/ticket/unassigned
router.get("/unassigned", verifyToken, rateLimiter, getUnAssignedTicket);

//todo: update ticket
//enpoint: http://localhost:5000/api/v1/ticket/update/:id
router.put(
  "/update/:id",
  rateLimiter,
  verifyToken,
  authorizeRoles(["developer", "admin", "qa", "tester", "manager"]),
  updateTicket
);
module.exports = router;
