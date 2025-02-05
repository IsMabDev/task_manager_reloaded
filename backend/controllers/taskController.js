
const { user } = require('../models/prismaClient');
const taskModel = require('../models/taskModel')
const asyncHandler = require("express-async-handler");
exports.getAllTasks = async (req, res) => {
  

  const tasks = await taskModel.getAllTasks(req.user.id);
  
  res.json(tasks);

}

exports.createTask = asyncHandler(async (req, res) => {
  
  const { title, description, categoryId } = req.body;
  console.log('categoryId: from taskController: ', categoryId);
  
  const userId = req.user.id
  
  const task = await taskModel.createTask(title, description, userId,categoryId);
  
  res.json(task);
})


exports.deleteTask = asyncHandler( async (req, res,next) => {
  try {
    const deletedTask = await taskModel.deleteTask(req.params.id);
   
    res.json(this.getAllTasks)
  } catch (err) {
    err.source="deleteTask controller"
    next(err)
  }
})

exports.updateTask = async (req, res,next) => {
  
  const userId = req.user.id
  const { id } = req.params
  const { title, description, status, dueDate } = req.body

  try {
    const task = await taskModel.updateTask(userId, id, title, description, status, dueDate);
      res.json(task);  

  } catch (err) {
    err.source="updateTask controller"
    next(err)
  }
  
}

exports.getTaskById = async (req, res) => {
  
  const task = await taskModel.getTaskById(req.params.id);
  console.log("get task from controller");
  res.json(task); 
}

exports.updateTaskStatus = async (req, res) => {
  
  const userId = req.user.id
  const { id } = req.params
  const { status } = req.body

  try {
    const task = await taskModel.updateTask(userId, id, null, null, status, null);
      res.json(task);  

  } catch (err) {
    err.source="updateTaskStatus controller"
    next(err)
  }
  
} 

exports.getTasksByCategory = async (req, res) => {
  const userId = req.user.id
  console.log('userId: ', userId);
  const { id } = req.params
  console.log('id: ', id);

  
  const tasks = await taskModel.getTasksByCategory(userId, id);
  res.json(tasks);
}