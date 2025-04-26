const { sequelize } = require("../db/init");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, //  not null, unique constraint
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "Comment is required field",
      },
    },
  },
  ticketId: {
    type: DataTypes.INTEGER,
    references: {
      model: "tickets",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// association
Comment.associate = (models) => {
  // each comment is created by one user
  Comment.belongsTo(models.Ticket, { foreignKey: "ticketId" });
  //
  Comment.belongsTo(models.User, { foreignKey: "userId" });


};

module.exports = Comment;
