// db.js
const pool = require("./pool"); // Assuming pool.js configures your PostgreSQL connection pool

// --- User Functions (Needed for Authentication) ---

/**
 * Gets a user by their username. Critically includes the password_hash
 * for comparison during login but should NOT be sent to the client.
 * @param {string} username - The username to look up.
 * @returns {Promise<object|null>} User object including password_hash, or null if not found.
 */
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

/**
 * Gets a user by their ID. Used by Passport's deserializeUser.
 * IMPORTANT: Explicitly excludes the password_hash for security.
 * @param {number} userId - The user's ID.
 * @returns {Promise<object|null>} User object (without password_hash), or null if not found.
 */
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


// --- Strategy Functions ---

/**
 * Inserts a new strategy for a specific user.
 * @param {string} strategyName - The name of the strategy.
 * @param {number} userId - The ID of the user creating the strategy.
 * @returns {Promise<number>} The strategyID of the newly created strategy.
 */
async function insertStrategy(strategyName, userId) {
  const query = `
    INSERT INTO strategies (strategy, user_id)
    VALUES ($1, $2)
    RETURNING strategyID
  `;
  try {
    const { rows } = await pool.query(query, [strategyName, userId]);
    if (rows.length === 0) {
      // This case should be rare with RETURNING but good practice
      throw new Error("Strategy insertion failed, no ID returned.");
    }
    return rows[0].strategyid; // Postgres returns lowercase column names by default
  } catch (error) {
    console.error("Error inserting strategy:", error);
    throw error; // Re-throw for router handling
  }
}

/**
 * Gets all strategies and their associated trades for a specific user.
 * @param {number} userId - The ID of the user whose strategies to fetch.
 * @returns {Promise<Array<object>>} An array of strategy objects, each containing its trades array.
 */
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

/**
 * Deletes a strategy and its associated trades (due to ON DELETE CASCADE in schema)
 * ensuring it belongs to the specified user.
 * @param {number} strategyId - The ID of the strategy to delete.
 * @param {number} userId - The ID of the user attempting the deletion.
 * @returns {Promise<number>} The number of strategy rows deleted (0 or 1).
 */
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


// --- Trade Functions ---

/**
 * Inserts a single trade linked to a specific strategy.
 * Note: Assumes ownership/validity of the strategyID has been checked previously by the router.
 * @param {object} tradeData - Object containing trade details (symbol, date, action, etc.).
 * @param {number} strategyId - The ID of the strategy this trade belongs to.
 * @returns {Promise<object>} The newly inserted trade row, including its generated tradeID.
 */
async function insertTrade(tradeData, strategyId) {
  const query = `
    INSERT INTO trades
      (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *  -- Return the complete inserted row
  `;
  const values = [
    tradeData.symbol, tradeData.date, tradeData.action,
    tradeData.sub_action, tradeData.trade_type, tradeData.qty, tradeData.price,
    tradeData.strikes, tradeData.value, tradeData.expdate, strategyId
  ];
  try {
    const { rows } = await pool.query(query, values);
    return rows[0]; // Should always return one row
  } catch (error) {
    console.error("Error inserting trade:", error);
    throw error;
  }
}

/**
 * Inserts multiple trades linked to a specific strategy.
 * Note: Assumes ownership/validity of the strategyID has been checked previously by the router.
 * @param {Array<object>} tradesArray - Array of trade data objects.
 * @param {number} strategyId - The ID of the strategy these trades belong to.
 * @returns {Promise<Array<object>>} An array of the newly inserted trade rows.
 */
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

/**
 * Gets all trades associated with a specific strategy ID.
 * Note: Assumes ownership/permission check happened before calling this function.
 * @param {number} strategyId - The strategy ID.
 * @returns {Promise<Array<object>>} Array of trade objects for the given strategy.
 */
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


/**
 * Deletes a single trade by its ID, but only if it belongs to a strategy
 * owned by the specified user.
 * @param {number} tradeId - The ID of the trade to delete.
 * @param {number} userId - The ID of the user attempting the deletion.
 * @returns {Promise<number>} The number of trade rows deleted (0 or 1).
 */
async function deleteTradeByIdForUser(tradeId, userId) {
  // Use JOIN (via USING) to check the user_id on the related strategy
  const query = `
    DELETE FROM trades t
    USING strategies s
    WHERE t.tradeID = $1          -- Match the specific trade
      AND t.strategyID = s.strategyID -- Link trade to its strategy
      AND s.user_id = $2          -- Ensure the strategy belongs to the correct user
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


// Export all the functions
module.exports = {
  // User functions (for Auth)
  getUserByUsername,
  getUserById,

  // Strategy functions
  insertStrategy,
  getStrategiesByUserId,
  deleteStrategyForUser, // Renamed for clarity

  // Trade functions
  insertTrade,
  insertTrades,
  getTradesByStrategyId,
  deleteTradeByIdForUser, // Renamed for clarity
};