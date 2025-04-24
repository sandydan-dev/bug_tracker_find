const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const Attachment = sequelize.define(
  "attachment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, //  not null, unique constraint
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Must be a valid URL",
        },
      },
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "File name is required field",
        },
      },
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "File type is required field",
        },
      },
    },
    ticketId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ticket",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "comment",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
    tableName: "attachments",
  }
);

// association
Attachment.associate = (models) => {
  // each attachment is created by one user
  Attachment.belongsTo(models.User, { foreignKey: "uploadedBy" });
  // each attachment is created by one comment
  Attachment.belongsTo(models.Comment, { foreignKey: "commentId" });
  // each attachment is created by one ticket
  Attachment.belongsTo(models.Ticket, { foreignKey: "ticketId" });
};

module.exports = Attachment;
