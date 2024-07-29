const pool = require("./pool");

async function getAllTrades() {
  const { rows } = await pool.query("SELECT * FROM trades");
  return rows;
}

async function insertTrade(tradeObj) {
  // await pool.query("INSERT INTO trades (symbol, date, action, strategy, qty, price, strikes, value, expiration) VALUES ($1)", 
  //   [symbol]);
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
  insertTrade
};