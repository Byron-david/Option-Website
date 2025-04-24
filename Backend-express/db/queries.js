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

async function getAllStrategies() {
  // const { rows } = await pool.query(
  //   `SELECT *
  //     FROM strategies, trades 
  //     WHERE strategies.strategyid = trades.strategyid`);
  try {
    const query = `SELECT 
        strategies.strategyid, strategy,
        symbol, date, action, sub_action, trade_type,
        qty, price, strikes, value, expdate
      FROM strategies, trades 
      WHERE strategies.strategyid = trades.strategyid`;

    const { rows } = await pool.query(query);
  
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

async function insertStrategy(strategyName, userId) {
  const query = `
    INSERT INTO strategies (strategy, user_id)
    VALUES ($1, $2)
    RETURNING strategyID
  `;
  try {
    const { rows } = await pool.query(query, [strategyName, userId]);
    if (rows.length === 0) {
      throw new Error("Strategy insertion failed, no ID returned.");
    }
    return rows[0].strategyid; // Postgres returns lowercase column names by default
  } catch (error) {
    console.error("Error inserting strategy:", error);
    throw error; // Re-throw for router handling
  }
}

async function insertTrade(tradeData, strategyId) {
  const query = `
    INSERT INTO trades
      (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *
  `;
  const values = [
    tradeData.symbol, tradeData.date, tradeData.action,
    tradeData.sub_action, tradeData.trade_type, tradeData.qty, tradeData.price,
    tradeData.strikes, tradeData.value, tradeData.expdate,
    strategyId,
    tradeData.userId   // ✅ Use this instead of referencing undefined `userId`
  ];
  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error inserting trade:", error);
    throw error;
  }
}


async function insertTrades(tradesArray, strategyId) {
    // Map each trade object to a promise returned by insertTrade
    const insertPromises = tradesArray.map(trade => insertTrade(trade, strategyId));
    try {
        // Execute all insertion promises concurrently
        const insertedTrades = await Promise.all(insertPromises);
        return insertedTrades;
    } catch (error) {
        console.error("Error inserting multiple trades:", error);
        // In a real app, consider using database transactions here
        // to ensure all trades are inserted or none are (atomicity).
        throw error;
    }
}

async function deleteTradeByIdForUser(tradeId, userId) {
  const query = `
    DELETE FROM trades
    WHERE tradeID = $1 AND user_id = $2
  `;
  try {
    const result = await pool.query(query, [tradeId, userId]);
    // rowCount will be 1 if deleted, 0 if tradeId doesn't exist or doesn't belong to user
    return result.rowCount;
  } catch (error) {
    console.error("Error deleting trade by ID:", error);
    throw error;
  }
}

async function deleteStrategyForUser(strategyId, userId) {
  const query = `
    DELETE FROM strategies
    WHERE strategyID = $1 AND user_id = $2
  `;
  try {
    const result = await pool.query(query, [strategyId, userId]);
    return result.rowCount; // 1 if deleted, 0 if not found or unauthorized
  } catch (error) {
    console.error("Error deleting strategy:", error);
    throw error;
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
  deleteStrategy,
  deleteTradeByIdForUser,
  deleteStrategyForUser,
  getStrategiesByUserId,
  getTradesByStrategyId,
};