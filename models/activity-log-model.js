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
      type: DataTypes.UUID,
      allowNull: true,
      validate: {
        isUUID: {
          args: 4,
          msg: "User ID must be a UUID v4",
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
      type: DataTypes.ENUM("success", "failed", "blocked"),
      allowNull: false,
      defaultValue: "success",
      validate: {
        isIn: {
          args: [["success", "failed", "blocked"]],
          msg: "Status must be one of: success, failed, blocked",
        },
      },
    },

    actorType: {
      type: DataTypes.ENUM("user", "system"),
      defaultValue: "user",
      validate: {
        isIn: {
          args: [["user", "system"]],
          msg: "Actor type must be user or system",
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
