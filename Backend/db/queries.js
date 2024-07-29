const pool = require("./pool");

async function getAllTrades() {
  const { rows } = await pool.query("SELECT * FROM trades");
  return rows;
}

async function getAllStrategies() {
  const { rows } = await pool.query("SELECT * FROM strategies");
  return rows;
}

async function insertTrade(tradeObj) {
  await pool.query(`INSERT INTO strategies (symbol, date, strategy, qty, strikes, value, expiration) 
  VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7)`, 
  [tradeObj.symbol], to_date([tradeObj.date], 'MM/DD/YYYY'), [tradeObj.strategy], [tradeObj.qty], [tradeObj.strikes], [tradeObj.value], [tradeObj.expiration]);

  // ('SPY', to_date('07/29/2024', 'MM/DD/YYYY'), 'Vertical Spread', 1, '150 / 160', 180, to_date('08/30/2024', 'MM/DD/YYYY')),
  // ('TSLA', to_date('07/29/2024', 'MM/DD/YYYY'), 'Vertical Spread', 1, '240 / 250', 600, to_date('08/30/2024', 'MM/DD/YYYY'));
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

// symbol VARCHAR ( 255 ),
// date time
// action text NOT NULL,
// strategy text NOT NULL,
// qty int NOT NULL,
// price int NOT NULL,
// strikes int NOT NULL,
// value int NOT NULL,
// expiration time

module.exports = {
  getAllTrades,
  getAllStrategies,
  insertTrade
};