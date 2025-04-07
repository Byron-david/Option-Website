const pool = require("./pool");
const client = pool.connect()

async function getUserByUsername(username) {
  // Select '*' to get all fields including password_hash for login check
  const query = 'SELECT * FROM users WHERE username = $1';
  try {
    const { rows } = await pool.query(query, [username]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error getting user by username:", error);
    throw error; // Re-throw for calling function (e.g., Passport strategy) to handle
  }
}

async function getUserById(userId) {
  // Select specific fields, excluding password_hash
  const query = 'SELECT id, username, email, created_at, is_active FROM users WHERE id = $1';
   try {
    const { rows } = await pool.query(query, [userId]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
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
    ORDER BY s.strategyID, t.date DESC -- Order strategies, then trades within strategy
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

async function deleteStrategyForUser(strategyId, userId) {
  const query = `
    DELETE FROM strategies
    WHERE strategyID = $1 AND user_id = $2
  `;
  try {
    // pool.query for DELETE returns a result object with rowCount
    const result = await pool.query(query, [strategyId, userId]);
    // rowCount indicates how many rows were deleted (0 if no match, 1 if successful)
    return result.rowCount;
  } catch (error) {
    console.error("Error deleting strategy:", error);
    throw error;
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
    userId
  ];
  try {
    const { rows } = await pool.query(query, values);
    return rows[0]; // Should always return one row
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

module.exports = {
  getUserByUsername,
  getUserById,

  // Strategy functions
  insertStrategy,
  getStrategiesByUserId,
  deleteStrategyForUser,

  // Trade functions
  insertTrade,
  insertTrades,
  getTradesByStrategyId,
  deleteTradeByIdForUser,
};