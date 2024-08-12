const { Pool } = require("pg");
const config = require('./utils/config')
const tradesRouter = require('./controllers/trades')
const logger = require('./utils/logger')
require("dotenv").config();

const fastify = require("fastify")({
  logger: true
})

logger.info('connecting to', config.DATABASE_URL)

const pool = new Pool({
  connectionString: config.DATABASE_URL
});

fastify.register(tradesRouter)

// Run the server!
fastify.listen({ port: config.PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const middleware = require('./utils/middleware')
// require('express-async-errors')

// app.use(cors())
// app.use(express.static('dist'))
// app.use(express.json())
// app.use(middleware.requestLogger)

// app.use('/dashboard', tradesRouter)

// app.get('/', (req, res) => res.send("Hello"));

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)