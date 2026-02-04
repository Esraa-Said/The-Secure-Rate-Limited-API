const asyncWrapper = require("../utils/async-wrapper");
const Task = require("../models/task-model");
const httpStatusText = require("../utils/http-status-text");
const CustomError = require("../utils/custom-error");

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create({ ...req.body , userId: req.user.id});

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "Task added",
    data: { task },
  });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.taskId;

  let task = await Task.findByPk(taskId);

  if (!task) {
    return next(new CustomError("Task not found", 404));
  }
  delete req.body.id;
  delete req.body.userId;
  task.set(req.body);
  await task.save();

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Task updated",
    data: { task },
  });
});

module.exports = { createTask, updateTask };
