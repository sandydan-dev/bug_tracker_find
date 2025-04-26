const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const TicketActivity = sequelize.define(
  "ticketactivity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tickets",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Sometimes system generated, no user
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM(
        "creation",
        "comment",
        "attachment",
        "status_change",
        "priority_change",
        "assignment_change",
        "other"
      ),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true, // optional short message
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // if related to a comment
    },
    attachmentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // if related to an attachment
    },
  },
  {
    timestamps: true,
    tableName: "ticketactivities",
  }
);

// association
TicketActivity.associate = (models) => {
  // each ticket activity belongs to one ticket
  TicketActivity.belongsTo(models.Ticket, { foreignKey: "ticketId" });
  // each ticket activity belongs to one user
  TicketActivity.belongsTo(models.User, { foreignKey: "userId" });
};

module.exports = TicketActivity;
