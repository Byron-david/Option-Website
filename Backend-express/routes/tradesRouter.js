const { Router } = require("express");
const tradesController = require("../controllers/tradesController");
const tradesRouter = Router();
const { ensureAuthenticated } = require('../utils/middleware'); // Use your auth middleware
const db = require("../db/queries");

// tradesRouter.get('/dashboard/trades', tradesController.getTrades)
tradesRouter.get('/dashboard/trades/:id', tradesController.getTrade)
// tradesRouter.post('/dashboard/trades', tradesController.addTrade)
tradesRouter.delete('/dashboard/trades/:id', tradesController.removeTrade)

// GET all trades for strategy
tradesRouter.get('/dashboard/strategies', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const strategies = await db.getStrategiesByUserId(userId);
    res.json(strategies);
  } catch (error) {
    console.error("Error fetching strategies:", error);
    res.status(500).json({ message: 'Failed to fetch strategies' });
  }
});

// // GET /dashboard/strategies/:strategyId/trades - Get trades for a strategy
tradesRouter.get('/dashboard/strategies/:strategyId', ensureAuthenticated, async (req, res) => {
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

tradesRouter.post('/dashboard/strategies', ensureAuthenticated, async (req, res) => {
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

module.exports = tradesRouter;