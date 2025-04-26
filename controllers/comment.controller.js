const Ticket = require("../models/Ticket.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

const createCommet = async (req, res) => {
  try {
    const userId = req.user; // get user id from token
    const ticketId = req.params.ticketId;
    const { comment } = req.body; // get comment and ticket id from request body

    // const user = await User.findByPk(userId);

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // check if ticket exists
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // Create comment only if comment body is provided
    const newComment = await Comment.create({
      ticketId,
      userId: userId.id,
      comment: comment || null, // if comment is not passed, set it as null
    });
    // save
    await newComment.save();

    return res.status(201).json({
      success: true,
      message: comment
        ? "Comment added successfully"
        : "Empty comment recorded (optional)",
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating comment",
      error: error.message,
    });
  }
};

// get all comments which is contain ids

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({});

    if (comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No comments found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All comments",
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting all comments",
      error: error.message,
    });
  }
};

// extract the data from ticket model and user model which is related to comments

const extractCommentData = async (req, res) => {
  try {
    // find all ticketid and userId from the table and populate them

    // find all comments
    const comments = await Comment.findAll({
      // order by commentId in desc
      order: [["id", "DESC"]],
    });

    if (comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No comments found",
      });
    }

    let populateComments = [];

    for (let comment of comments) {
      const { ticketId, userId } = comment;

      const ticket = await Ticket.findByPk(ticketId);

      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: `Ticket with id ${ticketId} not found`,
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User with id ${userId} not found`,
        });
      }

      populateComments.push({
        commentId: comment.id,
        commentText: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        ticket: {
          ticketId: ticket.id,
          ticketTitle: ticket.title,
          ticketStatus: ticket.status,
        },
        user: {
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          userRole: user.role,
        },
      });
    }

    console.log("Populate Data: ", populateComments);

    res.status(200).json({
      success: true,
      message: "All comments",
      comments: populateComments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting all comments",
      error: error.message,
    });
  }
};

// edit comments only
const editComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { comment } = req.body;
    const userId = req.user.id;

    // find comment by id
    const comments = await Comment.findByPk(commentId);

    if (!comments) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comments.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this comment",
      });
    }

    // update comment
    comments.comment = comment;
    await comments.save();

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating comment",
      error: error.message,
    });
  }
};

// delete comment
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    // find comment by id
    const comments = await Comment.findByPk(commentId);

    if (!comments) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comments.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    // delete comment
    await comments.destroy();

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting comment",
      error: error.message,
    });
  }
};

module.exports = {
  createCommet,
  getAllComments,
  extractCommentData,
  editComment,
  deleteComment,
};
