const { Router } = require("express");
const tradesController = require("../controllers/tradesController");
const tradesRouter = Router();

tradesRouter.get('/trades', tradesController.getTrades)
tradesRouter.post('/trades', tradesController.addTrade)

module.exports = tradesRouter;