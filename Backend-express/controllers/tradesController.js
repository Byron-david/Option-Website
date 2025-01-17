const db = require("../db/queries");

async function getTrades(req, res) {
  const strategies = await db.getAllStrategies()
  // const strategies = await db.getAllStrategies()
  res.json(strategies)
}

async function addTrade(req, res) {
  const body = req.body

  const strategy = await db.insertStrategy(body);
  const trade = await db.insertTrades(body, strategy);
  // const strategyName = Object.keys(body)[0]
  // const trade = body[strategyName][0]
  // const insertTrade = await db.insertTrade(trade, strategy);
  
  // console.log(trade);
  res.status(201).json(trade)
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

module.exports = {
  getTrades,
  addTrade,
  createUsernamePost
};