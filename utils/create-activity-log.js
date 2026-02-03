const ActivityLog = require("../models/activity-log-model");

const createActivityLog = async (req) => {
  try {
    const userId = req.user?.id || null;

    await ActivityLog.create({
      userId,
      action: req.action,
      activityLogStatus: req.logStatus,
      actorType: userId ? "user" : "system",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || null,
      endpoint: req.originalUrl,
      httpMethod: req.method,
      metadata: {
        body: req.body,
        params: req.params,
        query: req.query,
      },
    });
  } catch (error) {

  }
};

module.exports = createActivityLog;
