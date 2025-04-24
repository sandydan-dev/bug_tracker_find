const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const TicketActivity = sequelize.define(
  "ticketactivity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, //  not null, unique constraint
      autoIncrement: true,
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false, // not null constraint
      validate: {
        notEmpty: {
          msg: "Activity is required field",
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    type: {
      type: DataTypes.ENUM(
        "creation", // when ticket is created
        "comment", // when a comment is added
        "status_change", // open → in_progress
        "priority_change", // medium → high
        "assignment_change", // assigned to someone
        "attachment", // attachment added
        "other" // fallback
      ),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Main message like comment text or file name",
    },
    meta: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "Optional details like old/new status, assignment details, etc.",
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
