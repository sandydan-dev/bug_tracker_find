const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const Ticket = sequelize.define(
  "ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required field",
        },
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
    repoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Repository URL must be a valid URL",
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
    type: {
      type: DataTypes.ENUM("bug", "feature", "task"),
      defaultValue: "bug",
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
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
    tableName: "tickets",
  }
);

// association between user and ticket
Ticket.associate = (models) => {
  // TicketAssignments belong to one ticket
  Ticket.belongsToMany(models.User, {
    through: models.TicketAssignment,
    foreignKey: "ticketId",
  });

  // each ticket is created by one user
  Ticket.belongsTo(models.User, { foreignKey: "createdBy" });
  // each ticket is assigned to one user
  Ticket.belongsTo(models.User, { foreignKey: "assignedTo" });
};

module.exports = Ticket;
