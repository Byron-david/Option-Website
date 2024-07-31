const pool = require("./pool");

async function getAllTrades() {
  const { rows } = await pool.query("SELECT * FROM trades");
  return rows;
}

async function getAllStrategies() {
  const { rows } = await pool.query("SELECT * FROM trades, strategies WHERE strategies.strategyID = trades.strategyID");
  const allTrades = []
  let groupTrades = []
  let combineTrade = {};
  let id
  let strategy
  rows.forEach((trades, index) => {
    if (!id || id !== trades.strategyid) {
      id = trades.strategyid;

      if (groupTrades.length !== 0) {
        combineTrade[strategy] = groupTrades;
        allTrades.push(combineTrade)
        combineTrade = {}
        groupTrades = []
      }
      strategy = trades.strategy;
    }
    groupTrades.push(trades)

    if (index === rows.length - 1) {
      combineTrade[strategy] = groupTrades;
      allTrades.push(combineTrade)
    }
    });

  return allTrades;
}

async function insertStrategy(tradeObj) {
  const strategyID = await pool.query(`INSERT INTO strategies (symbol, date, strategy, qty, strikes, value, expiration) 
                    VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7) RETURNING strategyID`, 
  [tradeObj.symbol], [Date.parse(tradeObj.date)], [tradeObj.strategy], [tradeObj.qty], [tradeObj.strikes], [tradeObj.value], [Date.parse(tradeObj.expiration)]);

  return strategyID
}
async function insertTrade(tradeObj, id) {
  await pool.query(`INSERT INTO trades (symbol, date, action, strategy, qty, price, strikes, value, expiration) 
    VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10)`, 
    [tradeObj.symbol], [Date.parse(tradeObj.date)], [tradeObj.action],
    [tradeObj.strategy], [tradeObj.qty], [tradeObj.price],
    [tradeObj.strikes], [tradeObj.value],  [Date.parse(tradeObj.expiration)], [id])

    // ('SPY', (DATE '07/29/2024'), 'SELL', 'PUT', 1, 1.50, 160, 150, (DATE '08/30/2024')),
  // await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function getLastID() {
  const id = await pool.query(`SELECT * FROM strategies
                    ORDER BY strategyID DESC
                    LIMIT 1;`)
  return id;
}

module.exports = {
  getAllTrades,
  getAllStrategies,
  insertTrade,
  insertStrategy
};