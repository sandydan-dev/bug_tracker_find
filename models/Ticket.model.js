const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const Ticket = sequelize.define(
  "ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, //  not null, unique constraint
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // not null constraint
      validate: {
        notEmpty: {
          msg: "Title is required field",
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required field",
          },
        },
      },
      status: {
        type: DataTypes.ENUM(
          "open",
          "in_progress",
          "resolved",
          "closed",
          "cancelled"
        ),
        defaultValue: "open",
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high", "critical"),
        defaultValue: "medium",
      },
      assignedTo: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
  },
  {
    timestamps: true,
    tableName: "tickets",
  }
);

// association between user and ticket
Ticket.associate = (models) => {
  // each ticket is created by one user
  Ticket.belongsTo(models.User, { foreignKey: "createdBy" });
  // each ticket is assigned to one user
  Ticket.belongsTo(models.User, { foreignKey: "assignedTo" });
  //  each ticket has many comments
  Ticket.hasMany(models.Comment, { foreignKey: "ticketId" });
  // ticketactivities belong to one ticket
  Ticket.hasMany(models.TicketActivity, { foreignKey: "ticketId" });
  // TicketAssignments belong to one ticket
  Ticket.hasMany(models.TicketAssignment, { foreignKey: "ticketId" });
};

module.exports = Ticket;
