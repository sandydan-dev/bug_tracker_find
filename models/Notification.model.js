const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const Notification = sequelize.define(
  "notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      // onUpdate: "CASCADE",
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Message is required field",
        },
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Notification is unread by default
    },
  },
  {
    timestamps: true,
    tableName: "notifications",
  }
);


// association
Notification.associate = (models) => {
  // each notification is created by one user
  Notification.belongsTo(models.User, { foreignKey: "userId" });
};