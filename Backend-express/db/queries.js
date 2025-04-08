const pool = require("./pool");
const client = pool.connect()

// async function getAllTrades() {
//   try {
//     const {rows} = await pool.query("SELECT * FROM trades");
//     return rows
//   }
//   catch (error) {
//     console.error(error)
//   }
// }

async function getTradesByStrategyId(strategyId) {
    const query = `SELECT * FROM trades WHERE strategyID = $1 ORDER BY date DESC`;
    try {
        const { rows } = await pool.query(query, [strategyId]);
        return rows;
    } catch (error) {
        console.error("Error getting trades by strategy ID:", error);
        throw error;
    }
}

// async function getStrategiesByUserId(userId) {
//   // const { rows } = await pool.query(
//   //   `SELECT *
//   //     FROM strategies, trades 
//   //     WHERE strategies.strategyid = trades.strategyid`);
//   try {
//     const { rows } = await pool.query(query, [userId]);
//       `SELECT 
//         strategies.strategyid, strategy, strategies.user_id,
//         symbol, date, action, sub_action, trade_type,
//         qty, price, strikes, value, expdate
//       FROM strategies, trades 
//       WHERE strategies.strategyid = trades.strategyid AND
//       strategies.user_id = $1`;
  
//     const allTrades = []
//     let groupTrades = []
//     let strategy = {};
//     let id
//     let strategyName
//     rows.forEach((trades, index) => {
//       if (!id || id !== trades.strategyid) {
        
//         if (groupTrades.length !== 0) {
//           strategy[strategyName] = groupTrades;
//           strategy = {...strategy, id: id}
//           allTrades.push(strategy)
//           strategy = {}
//           groupTrades = []
//         }
//         strategyName = trades.strategy;
//         id = trades.strategyid;
//       }
//       groupTrades.push(trades)
  
//       if (index === rows.length - 1) {
//         strategy[strategyName] = groupTrades;
//         strategy = {...strategy, id: id}
//         allTrades.push(strategy)
//       }
//       });
  
//     return allTrades;
//   } catch (error) {
//     console.error(error)
//   }
// }

async function getStrategiesByUserId(userId) {
  const query = `
    SELECT
      s.strategyID, s.strategy, s.user_id,
      t.tradeID, t.symbol, t.date, t.action,
      t.sub_action, t.trade_type, t.qty, t.price,
      t.strikes, t.value, t.expdate
    FROM strategies s
    LEFT JOIN trades t ON s.strategyID = t.strategyID
    WHERE s.user_id = $1
    ORDER BY s.strategyID, t.date DESC
  `;
  try {
    const { rows } = await pool.query(query, [userId]);

    // Group trades by strategy using a Map for efficiency
    const strategiesMap = new Map();

    rows.forEach(row => {
      // If strategy isn't in the map yet, add it
      if (!strategiesMap.has(row.strategyid)) {
        strategiesMap.set(row.strategyid, {
          strategyID: row.strategyid,
          strategy: row.strategy,
          user_id: row.user_id,
          trades: [] // Initialize trades array
        });
      }

      // If the row contains trade data (due to LEFT JOIN, tradeid might be null if no trades)
      if (row.tradeid !== null) {
          const currentStrategy = strategiesMap.get(row.strategyid);
          currentStrategy.trades.push({
              tradeID: row.tradeid,
              symbol: row.symbol,
              date: row.date,
              action: row.action,
              sub_action: row.sub_action,
              trade_type: row.trade_type,
              qty: row.qty,
              price: row.price,
              strikes: row.strikes,
              value: row.value,
              expdate: row.expdate
              // Add any other trade fields you need
          });
      }
    });

    // Convert the Map values (the strategy objects) into an array
    console.log("================================")
    console.log(Array.from(strategiesMap.values()))
    console.log("================================")
    return Array.from(strategiesMap.values());
  } catch (error) {
    console.error("Error getting strategies by user ID:", error);
    throw error;
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
  // getAllTrades,
  // getAllStrategies,
  insertTrade,
  insertTrades,
  insertStrategy,
  deleteTrade,
  deleteStrategy,

  getStrategiesByUserId,
  getTradesByStrategyId,
};