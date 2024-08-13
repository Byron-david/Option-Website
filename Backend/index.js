// const app = require("./app.js");
// const config = require('./utils/config')
// const logger = require('./utils/logger')

// app.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })

const { Pool } = require("pg");
const config = require('./utils/config')
const tradesRouter = require('./controllers/trades')
const logger = require('./utils/logger')
require("dotenv").config();
const cors = require('@fastify/cors')

const fastify = require("fastify")({
  logger: true
})

logger.info('connecting to', config.DATABASE_URL)

const pool = new Pool({
  connectionString: config.DATABASE_URL
});

fastify.register(cors, {
  origin: true
})
fastify.register(tradesRouter)

// Run the server!
fastify.listen({ port: config.PORT, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})