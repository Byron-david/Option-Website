const { Pool } = require("pg");
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const tradesRouter = require('./controllers/trades')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
require('express-async-errors')

logger.info('connecting to', config.DATABASE_URL)

const pool = new Pool({
  connectionString: config.DATABASE_URL
});

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/dashboard', tradesRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app