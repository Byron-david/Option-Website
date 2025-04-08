// routes/tradesRouter.js
const express = require('express');
const db = require('../db/queries'); // Assuming your refactored db.js is here
const { ensureAuthenticated } = require('../utils/middleware'); // Use your auth middleware
const tradesRouter = express.Router();
const pool = require('../db/pool'); // Import pool if needed for direct checks

// --- Strategy Routes ---
// (POST /strategies, GET /strategies, DELETE /strategies/:strategyId - remain unchanged)
// POST /dashboard/strategies - Create a new strategy
tradesRouter.post('/strategies', ensureAuthenticated, async (req, res) => {
  const { strategy } = req.body;
  if (!strategy || typeof strategy !== 'string' || strategy.trim() === '') {
    return res.status(400).json({ message: 'Valid strategy name is required' });
  }
  try {
    const userId = req.user.id; // Get user ID from authenticated session
    const strategyId = await db.insertStrategy(strategy.trim(), userId);
    res.status(201).json({ strategyID: strategyId, strategy: strategy.trim(), user_id: userId });
  } catch (error) {
    console.error("Error creating strategy:", error);
    res.status(500).json({ message: 'Failed to create strategy' });
  }
});

// GET /dashboard/strategies - Get all strategies for the user
tradesRouter.get('/strategies', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const strategies = await db.getStrategiesByUserId(userId);
    res.json(strategies);
  } catch (error) {
    console.error("Error fetching strategies:", error);
    res.status(500).json({ message: 'Failed to fetch strategies' });
  }
});

// DELETE /dashboard/strategies/:strategyId - Delete a strategy
tradesRouter.delete('/strategies/:strategyId', ensureAuthenticated, async (req, res) => {
  const { strategyId } = req.params;
  const userId = req.user.id;
  if (isNaN(parseInt(strategyId, 10))) {
      return res.status(400).json({ message: "Invalid Strategy ID format." });
  }
  try {
    const deletedCount = await db.deleteStrategyForUser(parseInt(strategyId, 10), userId);
    if (deletedCount > 0) {
      res.status(204).send(); // Success, no content
    } else {
      res.status(404).json({ message: 'Strategy not found or access denied' });
    }
  } catch (error) {
    console.error("Error deleting strategy:", error);
    res.status(500).json({ message: 'Failed to delete strategy' });
  }
});


// --- Trade Routes ---

// POST /dashboard/strategies/:strategyId/trades - Add a single trade
tradesRouter.post('/strategies/:strategyId/trades', ensureAuthenticated, async (req, res) => {
  const { strategyId } = req.params;
  const tradeData = req.body;
  const userId = req.user.id; // Get userId from authenticated request

  if (isNaN(parseInt(strategyId, 10))) {
      return res.status(400).json({ message: "Invalid Strategy ID format." });
  }
  // Add validation for tradeData fields here...

  try {
    // Verify user owns the strategy before inserting trade
    const strategyOwnerCheck = await pool.query('SELECT user_id FROM strategies WHERE strategyid = $1', [parseInt(strategyId, 10)]);
    if (strategyOwnerCheck.rows.length === 0 || strategyOwnerCheck.rows[0].user_id !== userId) {
       return res.status(404).json({ message: 'Strategy not found or access denied' });
    }

    // Pass userId to db.insertTrade
    const newTrade = await db.insertTrade(tradeData, parseInt(strategyId, 10), userId);
    res.status(201).json(newTrade);
  } catch (error) {
    console.error("Error adding trade:", error);
    if (error.code === '23503') { // FK violation
        return res.status(404).json({ message: 'Strategy or User not found' });
    }
    res.status(500).json({ message: 'Failed to add trade' });
  }
});

// POST /dashboard/strategies/:strategyId/trades/bulk - Add multiple trades
tradesRouter.post('/strategies/:strategyId/trades/bulk', ensureAuthenticated, async (req, res) => {
  const { strategyId } = req.params;
  const tradesArray = req.body;
  const userId = req.user.id; // Get userId from authenticated request

  if (isNaN(parseInt(strategyId, 10))) {
      return res.status(400).json({ message: "Invalid Strategy ID format." });
  }
  if (!Array.isArray(tradesArray) || tradesArray.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of trades.' });
  }
   // Add validation for fields within each trade object here...

  try {
     // Verify user owns the strategy before inserting trades
    const strategyOwnerCheck = await pool.query('SELECT user_id FROM strategies WHERE strategyid = $1', [parseInt(strategyId, 10)]);
    if (strategyOwnerCheck.rows.length === 0 || strategyOwnerCheck.rows[0].user_id !== userId) {
       return res.status(404).json({ message: 'Strategy not found or access denied' });
    }

    // Pass userId to db.insertTrades
    const insertedTrades = await db.insertTrades(tradesArray, parseInt(strategyId, 10), userId);
    res.status(201).json(insertedTrades);
  } catch (error) {
    console.error("Error adding bulk trades:", error);
     if (error.code === '23503') { // FK violation
        return res.status(404).json({ message: 'Strategy or User not found or one/more trades invalid' });
    }
    res.status(500).json({ message: 'Failed to add bulk trades' });
  }
});

// GET /dashboard/strategies/:strategyId/trades - Get trades for a strategy
tradesRouter.get('/strategies/:strategyId/trades', ensureAuthenticated, async (req, res) => {
  const { strategyId } = req.params;
  const userId = req.user.id;
  if (isNaN(parseInt(strategyId, 10))) {
      return res.status(400).json({ message: "Invalid Strategy ID format." });
  }
  try {
    const strategyOwnerCheck = await pool.query('SELECT user_id FROM strategies WHERE strategyid = $1', [parseInt(strategyId, 10)]);
    if (strategyOwnerCheck.rows.length === 0 || strategyOwnerCheck.rows[0].user_id !== userId) {
       return res.status(404).json({ message: 'Strategy not found or access denied' });
    }
    const trades = await db.getTradesByStrategyId(parseInt(strategyId, 10));
    res.json(trades);
  } catch (error) {
    console.error("Error fetching trades for strategy:", error);
    res.status(500).json({ message: 'Failed to fetch trades' });
  }
});


// DELETE /dashboard/trades/:tradeId - Delete a specific trade
// (No change needed here, db function handles user check)
tradesRouter.delete('/trades/:tradeId', ensureAuthenticated, async (req, res) => {
  const { tradeId } = req.params;
  const userId = req.user.id;
  if (isNaN(parseInt(tradeId, 10))) {
      return res.status(400).json({ message: "Invalid Trade ID format." });
  }
  try {
    const deletedCount = await db.deleteTradeByIdForUser(parseInt(tradeId, 10), userId);
    if (deletedCount > 0) {
      res.status(204).send(); // Success, no content
    } else {
      res.status(404).json({ message: 'Trade not found or access denied' });
    }
  } catch (error) {
    console.error("Error deleting trade:", error);
    res.status(500).json({ message: 'Failed to delete trade' });
  }
});


module.exports = tradesRouter;