const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");


const ActivityLog = sequelize.define(
  "ActivityLog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: "User ID must be an integer",
        },
      },
    },

    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Action is required" },
        len: {
          args: [3, 100],
          msg: "Action must be between 3 and 100 characters",
        },
      },
    },

    status: {
      type: DataTypes.ENUM("SUCCESS", "FAILED", "BLOCKED"),
      allowNull: false,
      defaultValue: "SUCCESS",
      validate: {
        isIn: {
          args: [["SUCCESS", "FAILED", "BLOCKED"]],
          msg: "Status must be one of: SUCCESS, FAILED, BLOCKED",
        },
      },
    },

    actorType: {
      type: DataTypes.ENUM("USER", "SYSTEM", "ADMIN"),
      defaultValue: "USER",
      validate: {
        isIn: {
          args: [["USER", "SYSTEM", "ADMIN"]],
          msg: "Actor type must be USER, SYSTEM, or ADMIN",
        },
      },
    },

    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
      validate: {
        isIP: { msg: "IP address must be a valid IPv4 or IPv6" },
      },
    },

    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    endpoint: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: {
          args: [0, 255],
          msg: "Endpoint must be less than 255 characters",
        },
      },
    },

    httpMethod: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        isIn: {
          args: [["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]],
          msg: "HTTP method must be a valid method",
        },
      },
    },

    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "activity_logs",
    timestamps: true,
    updatedAt: false, // logs are immutable
  },
);

module.exports = ActivityLog;
