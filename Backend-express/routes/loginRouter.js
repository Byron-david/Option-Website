const { Router } = require("express");
const loginController = require("../controllers/loginController");
const loginRouter = Router();
const passport = require("../passportConfig");

// loginRouter.get('/users', loginController.getUser)
// loginRouter.post('/', passport.authenticate('local'), loginController.getUser)
// loginRouter.post('/', loginController.getUser)

loginRouter.post('/', passport.authenticate('local'), (req, res) => {
    console.log(req.user);
    res.json({ message: 'Login successful', user: req.user });
  });

module.exports = loginRouter;