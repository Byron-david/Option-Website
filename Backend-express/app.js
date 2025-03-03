const config = require('./utils/config')
const express = require('express')
const session = require("express-session");
const passport = require("./passportConfig");
const app = express()
const cors = require('cors')
// const tradesRouter = require('./controllers/trades')
const tradesRouter = require('./routes/tradesRouter')
const loginRouter = require('./routes/loginRouter')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
require('express-async-errors')

logger.info('connecting to', config.DATABASE_URL)

  
// Session configuration
app.use(
    session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
    })
);
// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// app.use(session({ secret: process.env.SESSION_SECRET,
//                   resave: false,
//                   saveUninitialized: false }));
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/dashboard', tradesRouter)
app.use('/signin', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app