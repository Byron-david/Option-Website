const { Router } = require("express");
const usersController = require("../controllers/tradesController");
const tradesRouter = Router();

// usersRouter.get("/", usersController.getUsernames);
// usersRouter.get("/new", usersController.createUsernameGet);
// usersRouter.post("/new", usersController.createUsernamePost);

tradesRouter.get('/trades', async (request, response) => { 
  const strategies = await db.getAllStrategies()
  // const strategies = await db.getAllStrategies()
  response.json(strategies)
})

module.exports = tradesRouter;