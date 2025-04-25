const TicketAssignment = require("../models/TicketAssignment.model");
const User = require("../models/User.model");
const Ticket = require("../models/Ticket.model");

const createTicketAssigment = async (req, res) => {
  try {
    const userId = req.user.id; // get user id from token
    const ticketId = req.query.ticketId; // get ticket id from params

    const user = await User.findByPk(userId); // get user

    // check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User ID not found",
      });
    }

    // check if ticket exists
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket ID not found",
      });
    }

    // check if user is already assigned
    const alreadyAssigned = await TicketAssignment.findOne({
      where: {
        userId,
        ticketId,
      },
    });

    // check if user is already assigned
    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: "User is already assigned to this ticket",
      });
    }

    // check if ticket is open, if not then throw error
    if (ticket.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "Ticket is no longer open to be assigned",
      });
    }

    // assign ticket to user
    const ticketAssignment = await TicketAssignment.create({
      userId,
      ticketId,
    });

    // update the ticket status
    ticket.status = "in_progress";
    ticket.assignedTo = userId; // update the assignedTo field

    // save the ticket
    await ticket.save();

    return res.status(200).json({
      message: "Ticket assigned and status updated to in_progress",
      TicketAssigned: ticketAssignment,
    });
  } catch (error) {
    // if user id not found from the token then throw error

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    // if name token expires
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    res.status(500).json({
      success: false,
      message: "Error while creating ticket assignment",
      error: error.message,
    });
  }
};

const getTicketsAssignedToDeveloper = async (req, res) => {
  const userId = req.user.id; // get user id from token

  try {
    //  find the user by id, get the name and email
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email"],
    });

    // check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User ID not found",
      });
    }

    // find all tickets assigned to user
    const assignments = await TicketAssignment.findAll({ where: { userId } });

    // extract the tickets id from the assignments
    const ticketIds = assignments.map((assignment) => assignment.ticketId); // get the ticket id from the assignment

    // find the tickets that are assigned to the user
    const tickets = await Ticket.findAll({
      where: { id: ticketIds },
    });

    return res.status(200).json({
      success: true,
      developer: {
        user: user.id,
        name: user.name,
        email: user.email,
      },
      assignTickets: tickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching assigned tickets",
      error: error.message,
    });
  }
};

// also change the status of the ticket model when developer done there assginment
const updateTicketStatus = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const statusBody = req.body;

    // find the ticket by id
    const ticket = await Ticket.findByPk(ticketId);

    // check if ticket exists
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket ID not found",
      });
    }

    // update the ticket status
    ticket.status = statusBody.status;

    // save the ticket
    await ticket.save();

    return res.status(200).json({
      success: true,
      message: "Ticket status updated",
      ticket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating ticket status",
      error: error.message,
    });
  }
};

// delete ticketAssignment by id and update the status in_progress to open
const deleteTicketAssignment = async (req, res) => {
  try {
    // find the ticketAssigment Id from the params
    const ticketAssignmentId = req.params.ticketAssignmentId;

    // find the ticketAssignment by id
    const ticketAssignment = await TicketAssignment.findByPk(
      ticketAssignmentId
    );

    // check if ticketAssignment exists
    if (!ticketAssignment) {
      return res.status(404).json({
        success: false,
        message: "TicketAssignment ID not found",
      });
    }

    // delete the ticketAssignment
    await ticketAssignment.destroy();

    // then update ticket model status to open
    const ticket = await Ticket.findByPk(ticketAssignment.ticketId);
    ticket.status = "open";
    await ticket.save();

    return res.status(200).json({
      success: true,
      message: "TicketAssignment deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting ticketAssignment",
      error: error.message,
    });
  }
};

module.exports = {
  createTicketAssigment,
  getTicketsAssignedToDeveloper,
  updateTicketStatus,
  deleteTicketAssignment,
};
