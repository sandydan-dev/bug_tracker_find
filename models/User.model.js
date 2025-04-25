const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, //  not null, unique constraint
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // not null constraint
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // unique constraint
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("developer", "admin", "qa", "tester", "manager"),
      defaultValue: "developer",
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

// association
User.associate = (models) => {
  // TicketAssignments belong to one user
  User.hasMany(models.TicketAssignment, { foreignKey: "userId" });
  // One user can have many tickets createdBy
  User.hasMany(models.Ticket, { foreignKey: "createdBy" });
  // One user can have many tickets assignedTo, as well as be assigned to many tickets
  User.hasMany(models.Ticket, { foreignKey: "assignedTo" });

   // A user can have many comments
   User.hasMany(models.Comment, { foreignKey: "userId" });
};

module.exports = User;
