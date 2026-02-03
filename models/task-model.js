const sequelize = require("../config/connectDB");
const { DataTypes } = require("sequelize");

const Task = sequelize.define(
  "Task",

  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title cannot be empty" },
        len: {
          args: [3, 150],
          msg: "Title must be between 3 and 150 characters",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 2000],
          msg: "Description cannot exceed 2000 characters",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"),
      defaultValue: "PENDING",
      allowNull: false,
      validate: {
        isIn: {
          args: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
          msg: "Status must be one of: PENDING, IN_PROGRESS, COMPLETED, CANCELLED",
        },
      },
    },

    priority: {
      type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
      defaultValue: "MEDIUM",
      allowNull: false,
      validate: {
        isIn: {
          args: [["LOW", "MEDIUM", "HIGH"]],
          msg: "Priority must be LOW, MEDIUM, or HIGH",
        },
      },
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: { msg: "Due date must be a valid date" },
      },
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "Task must be assigned to a user" },
        notEmpty: { msg: "User ID cannot be empty" },
      },
    },
  },
  {
    tableName: "tasks",
    timestamps: true, // createdAt & updatedAt
    paranoid: true, // enables deletedAt for soft delete
  },
);

Task.associate = (models) => {
  Task.belongsTo(models.User, { foreignKey: "userId", as: "owner" });
};

module.exports = Task;