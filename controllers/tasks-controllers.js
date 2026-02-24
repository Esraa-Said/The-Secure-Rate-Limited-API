const asyncWrapper = require("../utils/async-wrapper");
const Task = require("../models/task-model");
const httpStatusText = require("../utils/http-status-text");
const CustomError = require("../utils/custom-error");
const { Op } = require("sequelize");

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });

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

const getAllTasks = asyncWrapper(async (req, res, next) => {
  let { status, priority, title, dueDate } = req.query;
  const query = {
    userId: req.user.id,
    ...(status && {
      status: {
        [Op.like]: status,
      },
    }),
    ...(priority && {
      priority: {
        [Op.like]: priority,
      },
    }),
    ...(title && {
      title: {
        [Op.like]: `%${title}%`,
      },
    }),
    ...(dueDate && { dueDate }),
  };

  const tasks = await Task.findAll({ where: query });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { tasks },
    length: tasks.length,
  });
});

const getTasksStatus = asyncWrapper(async (req, res, next) => {
  const [
    pendingTasks,
    inProgressTasks,
    completedTasks,
    cancelledTasks,
    totalTasks,
  ] = await Promise.all([
    Task.count({ where: { status: "PENDING", userId: req.user.id } }),
    Task.count({ where: { status: "IN_PROGRESS", userId: req.user.id } }),
    Task.count({ where: { status: "COMPLETED", userId: req.user.id } }),
    Task.count({ where: { status: "CANCELLED", userId: req.user.id } }),
    Task.count({ where: { userId: req.user.id } }),
  ]);

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      pendingTasks,
      inProgressTasks,
      completedTasks,
      cancelledTasks,
      totalTasks,
    },
  });
});
const getAllDeletedTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.findAll({
    where: { userId: req.user.id, deletedAt: { [Op.ne]: null } },
    paranoid: false,
  });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { tasks },
    length: tasks.length,
  });
});

const softDeleteTasks = asyncWrapper(async (req, res, next) => {
  const { taskIds = [] } = req.body;
  if (taskIds.length == 0) {
    return next(new CustomError("No tasks provided", 404));
  }
  await Task.destroy({
    where: {
      id: {
        [Op.in]: taskIds,
      },
    },
  });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Tasks deleted successfully",
  });
});
const restoreDeleteTasks = asyncWrapper(async (req, res, next) => {
  const { taskIds = [] } = req.body;
  if (taskIds.length == 0) {
    return next(new CustomError("No tasks provided", 404));
  }
  await Task.restore({
    where: {
      id: {
        [Op.in]: taskIds,
      },
    },
  });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Tasks restored successfully",
  });
});

module.exports = {
  createTask,
  updateTask,
  getAllTasks,
  softDeleteTasks,
  restoreDeleteTasks,
  getAllDeletedTasks,
  getTasksStatus,
};
