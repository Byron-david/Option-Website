const { Router } = require("express");
const tradesController = require("../controllers/tradesController");
const tradesRouter = Router();

tradesRouter.get('/trades', tradesController.getTrades)
tradesRouter.get('/trades/:id', tradesController.getTrade)
tradesRouter.post('/trades', tradesController.addTrade)
tradesRouter.delete('/trades/:id', tradesController.removeTrade)

module.exports = tradesRouter;