const pool = require("./pool");
const client = pool.connect()

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
      `SELECT strategies.strategyid, strategy, symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate
        FROM strategies, trades 
        WHERE strategies.strategyid = trades.strategyid`);
  
    const allTrades = []
    let groupTrades = []
    let strategy = {};
    let id
    let strategyName
    rows.forEach((trades, index) => {
      if (!id || id !== trades.strategyid) {
        
        if (groupTrades.length !== 0) {
          strategy[strategyName] = groupTrades;
          strategy = {...strategy, id: id}
          allTrades.push(strategy)
          strategy = {}
          groupTrades = []
        }
        strategyName = trades.strategy;
        id = trades.strategyid;
      }
      groupTrades.push(trades)
  
      if (index === rows.length - 1) {
        strategy[strategyName] = groupTrades;
        strategy = {...strategy, id: id}
        allTrades.push(strategy)
      }
      });
  
    return allTrades;
  } catch (error) {
    console.error(error)
  }
}

const insertStrategy = async (tradeObj) => {
  try {
    const strategyName = Object.keys(tradeObj)[0]

    const strategy = `INSERT INTO strategies (strategy) 
                      VALUES ($1) RETURNING strategyid`
                      
    const response = await pool.query(strategy, [strategyName]);
  
    return response.rows[0].strategyid
  } catch (error) {
    console.error(error)
  }
}

const insertTrades = async (tradeObj, id) => {
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

const insertTrade = async (tradeObj, id) => {
  try {
    const text = `INSERT INTO trades (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyid) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`

    const values =
      [tradeObj.symbol, tradeObj.date, tradeObj.action,
      tradeObj.sub_action, tradeObj.trade_type, tradeObj.qty, tradeObj.price,
      tradeObj.strikes, tradeObj.value, tradeObj.expdate, id]
      
    const res = await pool.query(text, values)
    
    return res
  } catch (error) {
    console.error(error)
  }
}

const deleteTrade = async (id) => {
  const text = `DELETE FROM trades WHERE strategyid = $1`

  const res = await pool.query(text, [id])

  return res;

  // try/catch moved to controller
  // try {
  //   const text = `DELETE FROM trades WHERE strategyid = $1`

  //   const res = await pool.query(text, [id])

  //   return res
  // } catch (error) {
  //   console.error(error)
  // }
}

const deleteStrategy = async (id) => {
  try {
    const text = `DELETE FROM strategies WHERE strategyid = $1`

    const res = await pool.query(text, [id])

    return res
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAllTrades,
  getAllStrategies,
  insertTrade,
  insertTrades,
  insertStrategy,
  deleteTrade,
  deleteStrategy
};