const app = require('./app') // The Express app
const config = require('./utils/config')
const logger = require('./utils/logger')
const cron = require('node-cron')
const { resetDatabase } = require('./db/resetDb')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// Run once every 24 hours to keep database clean for testing
cron.schedule('0 0 * * *', async () => {
  logger.info('Running scheduled task: Daily Database Reset');
  await resetDatabase();
})