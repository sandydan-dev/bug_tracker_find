const User = require("../models/User.model");
const Ticket = require("../models/Ticket.model");
const Comment = require("../models/Comment.model");
const Attachment = require("../models/Attachment.model");
const { Op } = require("sequelize");

const uploadAttachment = async (req, res) => {
  try {
    const userId = req.user?.id; // get user id from token
    const ticketId = req.params.ticketId; // get ticket id from params
    const commentId = req.params.commentId; // get comment id from params

    // get files from request body, otherwise empty array
    const files = req.files || [];

    // check if user exists
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

    // check if comment exists
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    const uploadedRecords = [];

    // Process each file
    // Process each file
    for (const file of files) {
      // Build the full URL for the uploaded file
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        file.filename
      }`; // Use req.protocol and req.get('host')
      console.log("Generated file URL:", fileUrl); // Debug URL

      // Create an attachment for each file
      const attachment = await Attachment.create({
        url: fileUrl, // full URL
        fileName: file.originalname, // use original filename
        ticketId,
        commentId,
        uploadedBy: userId,
      });

      uploadedRecords.push(attachment); // push to array
    }

    // Return success message
    return res.status(201).json({
      success: true,
      message: uploadedRecords.length
        ? "Attachments uploaded successfully"
        : "No attachments uploaded, but request processed.",
      attachments: uploadedRecords,
    });
  } catch (error) {
    console.error("Attachment upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while uploading attachments",
    });
  }
};

// delete attachement by id

const deleteAttachment = async (req, res) => {
  try {
    const attachmentId = req.params.attachmentId;
    const attachment = await Attachment.findByPk(attachmentId);

    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    // delete attachment
    await attachment.destroy();

    return res.status(200).json({ message: "Attachment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while deleting attachment" });
  }
};

module.exports = { uploadAttachment, deleteAttachment };
