const taskController = require("../controllers/taskController");
const express = require("express");
const router = express.Router();

router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.get('/:id', taskController.getTaskById);
router.delete('/:id', taskController.deleteTask);

module.exports = router; 