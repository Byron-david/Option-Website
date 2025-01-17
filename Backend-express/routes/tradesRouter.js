const { Router } = require("express");
const tradesController = require("../controllers/tradesController");
const tradesRouter = Router();

// usersRouter.get("/", usersController.getUsernames);
// usersRouter.get("/new", usersController.createUsernameGet);
// usersRouter.post("/new", usersController.createUsernamePost);

tradesRouter.get('/trades', tradesController.getTrades)
tradesRouter.post('/trades', tradesController.addTrades)

module.exports = tradesRouter;