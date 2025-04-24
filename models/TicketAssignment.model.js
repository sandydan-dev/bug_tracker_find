// models/TicketAssignment.js
const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const TicketAssignment = sequelize.define(
  "ticketAssignment",
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
        model: "tickets", // the table this refers to
        key: "id",
      },
      onDelete: "CASCADE", // if the ticket is deleted, assignments are also deleted
      onUpdate: "CASCADE", // if the ticket id changes, assignment also updates
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // the table this refers to
        key: "id",
      },
      onDelete: "CASCADE", // if the user is deleted, the assignment is also deleted
      onUpdate: "CASCADE", // if the user id changes, assignment also updates
    },
    assignedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // set the current date/time when the assignment is made
    },
  },
  {
    timestamps: false, // this model doesn't need createdAt/updatedAt timestamps
    tableName: "ticket_assignments",
  }
);

// associations
TicketAssignment.associate = (models) => {
  // A ticket can have many users assigned
  TicketAssignment.belongsTo(models.Ticket, { foreignKey: "ticketId" });
  // A user can be assigned to many tickets
  TicketAssignment.belongsTo(models.User, { foreignKey: "userId" });
};

module.exports = TicketAssignment;
