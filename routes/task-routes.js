const express = require("express");
const taskControllers = require("../controllers/tasks-controllers");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.route("/").post(authMiddleware, taskControllers.createTask);
router.route("/:taskId").post(authMiddleware, taskControllers.updateTask);

module.exports = router;
