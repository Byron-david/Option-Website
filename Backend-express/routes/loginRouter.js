const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controllers/loginController");

loginRouter.post('/login', loginController.loginUser);
// loginRouter.get('/login', loginController.loginUser);
loginRouter.get('/me', loginController.getCurrentUser);
loginRouter.post('/logout', loginController.logoutUser);
loginRouter.get('/auth', loginController.checkAuth);
loginRouter.post('/auth', loginController.checkAuth);

module.exports = loginRouter;