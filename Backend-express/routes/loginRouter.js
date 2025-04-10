const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controllers/loginController");
const { ensureAuthenticated } = require('../utils/middleware'); // Use your auth middleware

loginRouter.post('/signup', loginController.createUser)
loginRouter.post('/login', loginController.loginUser);
loginRouter.get('/me', loginController.getCurrentUser);
loginRouter.post('/logout', loginController.logoutUser);
loginRouter.get('/auth', loginController.checkAuth);
loginRouter.post('/auth', loginController.checkAuth);
loginRouter.get('/test-protected', ensureAuthenticated, (req, res) => {
    res.json({ message: 'You are authenticated!', user: req.user });
  });
  
module.exports = loginRouter;