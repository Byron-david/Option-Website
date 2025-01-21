const db = require("../db/queries");

async function getTrades(req, res) {
  const strategies = await db.getAllStrategies()
  // const strategies = await db.getAllStrategies()
  res.json(strategies)
}

async function addTrade(req, res) {
  const body = req.body;

  const id = await db.insertStrategy(body);
  await db.insertTrades(body, id);

  res.status(201).send(body);
}

module.exports = {
  getTrades,
  addTrade,
};