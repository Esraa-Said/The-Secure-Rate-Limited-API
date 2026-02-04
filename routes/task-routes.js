const express = require("express");
const taskControllers = require("../controllers/tasks-controllers");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, taskControllers.getAllTasks)
  .post(authMiddleware, taskControllers.createTask)
  .delete(authMiddleware, taskControllers.softDeleteTasks);
router.get("/deleted", authMiddleware, taskControllers.getAllDeletedTasks);
router.patch("/restore", authMiddleware, taskControllers.restoreDeleteTasks);
router.route("/:taskId").patch(authMiddleware, taskControllers.updateTask);

module.exports = router;
