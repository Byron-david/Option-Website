const { Router } = require("express");
const signupController = require("../controllers/signupController");
const signupRouter = Router();

// signupRouter.get('/users', signupController.getUser)
signupRouter.post('/', signupController.createUser)

module.exports = signupRouter;