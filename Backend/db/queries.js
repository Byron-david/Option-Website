const pool = require("./pool");

async function getAllTrades() {
  const { rows } = await pool.query("SELECT * FROM trades");
  return rows;
}

// symbol VARCHAR ( 255 ),
// date date,
// action text NOT NULL,
// tradeType text NOT NULL,
// qty int NOT NULL,
// price Numeric(10, 2) NOT NULL,
// strikes int,
// value int NOT NULL,
// expiration date,

async function getAllStrategies() {
  // const { rows } = await pool.query(
  //   `SELECT *
  //     FROM strategies, trades 
  //     WHERE strategies.strategyid = trades.strategyid`);
  const { rows } = await pool.query(
    `SELECT strategies.strategyid, strategy, symbol, date, action, subaction, subaction, tradeType, qty, price, strikes, value, expdate
      FROM strategies, trades 
      WHERE strategies.strategyid = trades.strategyid`);

      console.log(rows);
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
  const strategyName = Object.keys(tradeObj)[0]

  const strategyID = await pool.query(`INSERT INTO strategies (symbol, date, strategy, qty, strikes, value, expdate) 
                    VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7) RETURNING strategyID`, 
  [tradeObj.symbol], [Date.parse(tradeObj.date)], [tradeObj.strategy], [tradeObj.qty], [tradeObj.strikes], [tradeObj.value], [Date.parse(tradeObj.expdate)]);

  return strategyID
}
async function insertTrade(tradeObj, id) {
  await pool.query(`INSERT INTO trades (symbol, date, action, subaction strategy, qty, price, strikes, value, expdate) 
    VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10)`, 
    [tradeObj.symbol], [Date.parse(tradeObj.date)], [tradeObj.action],
    [tradeObj.strategy], [tradeObj.qty], [tradeObj.price],
    [tradeObj.strikes], [tradeObj.value],  [Date.parse(tradeObj.expdate)], [id])

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