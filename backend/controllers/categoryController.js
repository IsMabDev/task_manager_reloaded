const categoryModel = require('../models/categoryModel')
const asyncHandler = require("express-async-handler");

const categoryController = {
  getAllCategories: asyncHandler(async (req, res) => {
    const userId = req.user.id
    const categories = await categoryModel.getAllCategories(userId);
    res.json(categories);
  }),

  createCategory: asyncHandler(async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id
    const category = await categoryModel.createCategory(userId, title);
    res.status(201).json(category);
  }),
  updateCategory: asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { id } = req.params;
    const { title } = req.body;
    const category = await categoryModel.updateCategory(userId, parseInt(id), title);
    res.json(category);
  }),
  getCategoryById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.getCategoryById(parseInt(id));
    res.json(category);
  }),
  deleteCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.deleteCategory(
      req.user.id,
      parseInt(id)
    );
    res.json(category);
  }),
  
};

module.exports = categoryController