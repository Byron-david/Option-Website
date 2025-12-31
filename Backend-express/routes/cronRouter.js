const express = require('express');
const router = express.Router();
const { resetDatabase } = require('../db/resetDb');
const logger = require('../utils/logger');

router.get('/cron-reset', async (req, res) => {
  // Security: Check for Vercel's signature to prevent strangers from resetting your DB
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  logger.info('Running scheduled task: Daily Database Reset');
  await resetDatabase();
  res.json({ success: true, message: 'Database reset complete' });
});

module.exports = router;