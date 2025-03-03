const { Router } = require("express");
const loginController = require("../controllers/loginController");
const loginRouter = Router();
const passport = require("./passport");

// loginRouter.get('/users', loginController.getUser)
loginRouter.post('/', passport.authenticate('local'), loginController.createUser)

module.exports = loginRouter;