const asyncWrapper = require("../utils/async-wrapper");
const Task = require("../models/task-model");
const httpStatusText = require("../utils/http-status-text");

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "Task is added",
    data: { task },
  });
});

module.exports = { createTask };
