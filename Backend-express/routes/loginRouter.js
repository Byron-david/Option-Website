const { Router } = require("express");
const loginController = require("../controllers/loginController");
const loginRouter = Router();

loginRouter.post('/', loginController.loginUser);
loginRouter.get('/me', loginController.getCurrentUser);
loginRouter.post('/logout', loginController.logoutUser);
loginRouter.post('/auth', loginController.checkAuth);

module.exports = loginRouter;