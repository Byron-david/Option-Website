const pool = require("./pool");

async function getAllTrades() {
  try {
    const {rows} = await pool.query("SELECT * FROM trades");
    return rows
  }
  catch (error) {
    console.error(error)
  }
}

async function getAllStrategies() {
  // const { rows } = await pool.query(
  //   `SELECT *
  //     FROM strategies, trades 
  //     WHERE strategies.strategyid = trades.strategyid`);
  try {
    const { rows } = await pool.query(
      `SELECT strategies.strategyid, strategy, symbol, date, action, subaction, subaction, tradeType, qty, price, strikes, value, expdate
        FROM strategies, trades 
        WHERE strategies.strategyid = trades.strategyid`);
  
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
  } catch (error) {
    console.error(error)
  }
}

async function insertStrategy(tradeObj) {
  try {
    const strategyName = Object.keys(tradeObj)[0]

    const strategy = await pool.query(`INSERT INTO strategies (strategy) 
                      VALUES ($1) RETURNING strategyid`, [strategyName]);
  
    const id = strategy.rows[0].strategyid
  
    return id
  } catch (error) {
    console.error(error)
  }
}

async function insertTrades(tradeObj, id) {
  try {
    const strategyName = Object.keys(tradeObj)[0]
    const trades = tradeObj[strategyName]
  
    for (const trade of trades) {
      await insertTrade(trade, id)
    }
  } catch (error) {
    console.error(error)
  }
}

async function insertTrade(tradeObj, id) {
  try {
    await pool.query(`INSERT INTO trades (symbol, date, action, subaction strategy, qty, price, strikes, value, expdate) 
      VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10)`, 
      [tradeObj.symbol], [Date.parse(tradeObj.date)], [tradeObj.action],
      [tradeObj.tradeType], [tradeObj.qty], [tradeObj.price],
      [tradeObj.strikes], [tradeObj.value],  [Date.parse(tradeObj.expdate)], [id])
  
  
      // ('SPY', (DATE '07/29/2024'), 'SELL', 'PUT', 1, 1.50, 160, 150, (DATE '08/30/2024')),
    // await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAllTrades,
  getAllStrategies,
  insertTrade,
  insertTrades,
  insertStrategy
};