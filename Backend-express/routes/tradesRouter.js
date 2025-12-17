const { Router } = require("express");
const tradesController = require("../controllers/tradesController");
const tradesRouter = Router();
const { ensureAuthenticated } = require('../utils/middleware'); // Use your auth middleware
const db = require("../db/queries");

// tradesRouter.get('/trades', tradesController.getTrades)
tradesRouter.get('/trades/:id', tradesController.getTrade)
// tradesRouter.post('/trades', tradesController.addTrade)
tradesRouter.delete('/trades/:id', tradesController.removeTrade)

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
  const {
    newTrade: {
      strategy,
      trades,
      symbol,
      date
    }
  } = req.body;

  const userId = req.user.id;

  if (!strategy || typeof strategy !== 'string' || strategy.trim() === '') {
    return res.status(400).json({ message: 'Valid strategy name is required' });
  }

  try {
    // 1. Insert strategy
    const strategyId = await db.insertStrategy(strategy, userId);

    // 2. Format trades before insert (ensure required fields like user_id are present)
    const formattedTrades = trades.map(t => ({
      ...t,
      symbol,
      date,
      userId,
    }));

    // 3. Insert all trades
    const insertedTrades = await db.insertTrades(formattedTrades, strategyId);

    // 4. Respond with inserted data
    res.status(201).json({
      strategyID: strategyId,
      trades: insertedTrades,
      user_id: userId
    });
  } catch (error) {
    console.error("Error creating strategy with trades:", error);
    res.status(500).json({ message: 'Failed to create strategy and trades' });
  }
});

tradesRouter.put('/dashboard/strategies/:strategyId', ensureAuthenticated, async (req, res) => {
  const { strategyId } = req.params;
  const { newTrade: { strategy, trades, symbol, date } } = req.body;
  const userId = req.user.id;

  if (isNaN(parseInt(strategyId, 10))) {
    return res.status(400).json({ message: "Invalid Strategy ID." });
  }

  try {
    // 1. Verify ownership and update the strategy name
    const updatedStrategy = await db.updateStrategy(parseInt(strategyId, 10), strategy, userId);
    if (!updatedStrategy) {
      return res.status(404).json({ message: 'Strategy not found or access denied' });
    }

    // 2. Delete existing trades for this strategy (simplest way to "update" the set of trades)
    // Note: This replaces all trades. If you need to preserve IDs, logic would be more complex.
    await db.deleteTradesForStrategy(parseInt(strategyId, 10));

    // 3. Insert the new set of trades
    const formattedTrades = trades.map(t => ({
      ...t,
      symbol,
      date,
      userId,
    }));
    
    const insertedTrades = await db.insertTrades(formattedTrades, parseInt(strategyId, 10));

    res.json({
      strategyID: parseInt(strategyId, 10),
      strategy: strategy,
      trades: insertedTrades,
      user_id: userId
    });

  } catch (error) {
    console.error("Error updating strategy:", error);
    res.status(500).json({ message: 'Failed to update strategy' });
  }
});

// DELETE /dashboard/strategies/:strategyId - Delete a strategy
tradesRouter.delete('/dashboard/strategies/:strategyId', ensureAuthenticated, async (req, res) => {
  const { strategyId } = req.params;

  const userId = req.user.id;
  console.log('=============')
  console.log(req.params)
  console.log("Deleting strategy", strategyId, "for user", userId);
  console.log('=============')
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


module.exports = tradesRouter;