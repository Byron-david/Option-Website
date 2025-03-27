const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post('/check-username', userController.checkUsername)
userRouter.post('/check-email', userController.checkEmail)

module.exports = userRouter;