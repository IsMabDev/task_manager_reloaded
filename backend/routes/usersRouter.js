//userRoutes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.testController); 
router.get('/createFakeUsers', userController.createFakeUsers);

module.exports = router