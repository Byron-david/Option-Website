const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controllers/loginController");

loginRouter.post('/', loginController.loginUser);
loginRouter.get('/me', loginController.getCurrentUser);
loginRouter.post('/logout', loginController.logoutUser);
loginRouter.post('/auth', loginController.checkAuth);

module.exports = loginRouter;