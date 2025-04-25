const Ticket = require("../models/Ticket.model");
22;
const User = require("../models/User.model");

const createTicket = async (req, res) => {
  try {
    const { title, description, priority, type } = req.body;

    if (!title || !description || !priority || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find user createdby who create the tickets from the token
    const createdBy = req.user.id;

    // check if user exists
    const user = await User.findByPk(createdBy);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const repoUrl = `https://github.com/${user.role}/${user.name}/project-repo`; // generate repo url

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      type,
      repoUrl,
      createdBy,
      assignedTo: null,
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating ticket",
      error: error.message,
    });
  }
};

// get all tickets list

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();

    if (tickets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tickets found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All tickets",
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting all tickets",
      error: error.message,
    });
  }
};

// get tickets by id
const getTicketById = async (req, res) => {
  try {
    const id = req.params.id;

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket found",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting ticket by id",
      error: error.message,
    });
  }
};

// see the unassigned ticket
const getUnAssignedTicket = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: {
        assignedTo: null,
      },
    });

    if (tickets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No unassigned tickets found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All unassigned tickets",
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting all unassigned tickets",
      error: error.message,
    });
  }
};

// update the ticket
const updateTicket = async (req, res) => {
  try {
    const id = req.params.id;
    const updataTicket = req.body;

    const ticketId = await Ticket.findByPk(id);

    if (!ticketId) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const ticket = await Ticket.update(updataTicket, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating ticket",
      error: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  getUnAssignedTicket,
  updateTicket,
};
