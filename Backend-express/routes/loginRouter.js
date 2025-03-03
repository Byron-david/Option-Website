const { Router } = require("express");
const loginController = require("../controllers/loginController");
const loginRouter = Router();
const passport = require("../passportConfig");

// loginRouter.get('/users', loginController.getUser)
loginRouter.post('/', passport.authenticate('local'), loginController.getUser)

module.exports = loginRouter;