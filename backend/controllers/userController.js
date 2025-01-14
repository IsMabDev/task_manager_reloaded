//userController.js
const bcrypt = require("bcryptjs");

const userModel = require("../models/userModel");
const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
exports.testController = (req, res) => {
  res.send("hello world");
};  

exports.getAllUsers = async (req, res) => {

  const users = await userModel.getAllUsers();

  res.json(users);  

}

exports.createUser = asyncHandler(async (req, res,next) => {
  
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    // if err, do something
    if (err) {
      return next(err);
    }
    // Handle error

    // otherwise, store hashedPassword in DB

    try {
      const user = await userModel.createUser(
        req.body.name,
        req.body.email,
        hashedPassword
      );
      categoryModel.ensureDefaultCategoryForUser(user.id);
      res.status(201).json(user);
    } catch (err) {
      err.source = "createUser controller";
      console.log('err.source: ', err.source);
      
      next (err);    }
  })  
})
 

  


exports.deleteUser = async (req, res) => {
  const user = await userModel.deleteUser(req.params.id);
  res.json(user);
};

exports.getUserbyId = async (req, res) => {
  if (req.params.id) {
    const user = await userModel.getUserbyId(req.params.id);
    res.json(user);
  }
};

exports.updateUser = async (req, res) => {
  const user = await userModel.updateUser(req.params.id, req.body.name, req.body.email, req.body.password);
  res.json(user);
};



exports.createFakeUsers = async (req, res) => {
  const users = await userModel.createFakeUsers();
  res.json(users);
};

