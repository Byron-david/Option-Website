const config = require('./utils/config')
const express = require('express')
const session = require("express-session");
const passport = require("./passportConfig");
const app = express()
const cors = require('cors')
// const tradesRouter = require('./controllers/trades')
const tradesRouter = require('./routes/tradesRouter')
const loginRouter = require('./routes/loginRouter')
const signupRouter = require('./routes/signupRouter')
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

app.use(cors({
  origin: (origin, callback) => {
    // List of allowed origins
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

    // Allow requests with no origin (e.g., mobile apps, curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from ${origin}.`;
      return callback(new Error(msg), false);
    }
  },
  credentials: true, // Allow cookies to be sent
}));

app.use(express.static('dist'))

app.use(express.json())
app.use(middleware.requestLogger)

app.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ authenticated: true });
    } else {
      res.json({ authenticated: false });
    }
  });

app.use('/dashboard', tradesRouter)
app.use('/signup', signupRouter)
app.use('/signin', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app