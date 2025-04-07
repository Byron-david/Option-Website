const pool = require("./pool");

// User-related functions
async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const { rows } = await pool.query(query, [username]);
  return rows[0] || null;
}

async function createUser(username) {
  const query = 'INSERT INTO users (username) VALUES ($1) RETURNING *';
  const { rows } = await pool.query(query, [username]);
  return rows[0];
}

// Strategy functions with user context
async function insertStrategy(tradeObj, username) {
  // Get or create user
  let user = await getUserByUsername(username);
  if (!user) {
    user = await createUser(username);
  }

  const strategyName = Object.keys(tradeObj)[0];
  const query = `
    INSERT INTO strategies (strategy, id) 
    VALUES ($1, $2) 
    RETURNING strategyID
  `;
  const { rows } = await pool.query(query, [strategyName, user.id]);
  return rows[0].strategyID;
}

// Trade functions with user context
async function getTradesByUsername(username) {
  const query = `
    SELECT t.* 
    FROM trades t
    JOIN strategies s ON t.strategyID = s.strategyID
    JOIN users u ON s.id = u.id
    WHERE u.username = $1
    ORDER BY t.date DESC
  `;
  const { rows } = await pool.query(query, [username]);
  return rows;
}

async function getTradeByUsernameAndId(username, tradeID) {
  const query = `
    SELECT t.* 
    FROM trades t
    JOIN strategies s ON t.strategyID = s.strategyID
    JOIN users u ON s.id = u.id
    WHERE u.username = $1 AND t.tradeID = $2
  `;
  const { rows } = await pool.query(query, [username, tradeID]);
  return rows[0] || null;
}

async function deleteTradeByUsernameAndId(username, tradeID) {
  const query = `
    DELETE FROM trades t
    USING strategies s, users u
    WHERE t.strategyID = s.strategyID 
      AND s.id = u.id 
      AND u.username = $1 
      AND t.tradeID = $2
    RETURNING t.*
  `;
  const { rows } = await pool.query(query, [username, tradeID]);
  return { rowCount: rows.length, rows };
}

// Your existing functions (slightly modified for consistency)
async function getAllTrades() {
  const { rows } = await pool.query("SELECT * FROM trades");
  return rows;
}

async function getAllStrategies() {
  const { rows } = await pool.query(`
    SELECT 
      s.strategyID, s.strategy, 
      t.tradeID, t.symbol, t.date, t.action, 
      t.sub_action, t.trade_type, t.qty, t.price, 
      t.strikes, t.value, t.expdate
    FROM strategies s
    LEFT JOIN trades t ON s.strategyID = t.strategyID
    ORDER BY s.strategyID, t.date
  `);

  const groupedStrategies = {};
  rows.forEach(row => {
    if (!groupedStrategies[row.strategyid]) {
      groupedStrategies[row.strategyid] = {
        strategyID: row.strategyid,
        strategy: row.strategy,
        trades: []
      };
    }
    if (row.tradeid) {
      groupedStrategies[row.strategyid].trades.push({
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
      });
    }
  });

  return Object.values(groupedStrategies);
}

// Keep your existing insertTrade and insertTrades functions
// They don't need modification as they work with strategyID

module.exports = {
  // User-related functions
  getUserByUsername,
  createUser,
  
  // New username-based functions
  getTradesByUsername,
  getTradeByUsernameAndId,
  deleteTradeByUsernameAndId,
  
  // Existing functions
  getAllTrades,
  getAllStrategies,
  insertStrategy,
};