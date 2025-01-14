const categoryController = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.get("/:id", categoryController.getCategoryById);
router.get("/:id/tasks", taskController.getTasksByCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;