//userController.js
const userModel = require("../models/userModel");
exports.testController = (req, res) => {
  res.send("hello world");
};

exports.createFakeUsers = async (req, res) => {
  const users = await userModel.createFakeUsers();
  res.json(users);
};