const { Router } = require("express");
const loginController = require("../controllers/loginController");
const loginRouter = Router();

// loginRouter.get('/users', loginController.getUser)
loginRouter.post('/', loginController.createUser)

module.exports = loginRouter;