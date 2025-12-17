const config = require('./utils/config')
const express = require('express')
const session = require("express-session");
const passport = require("./passportConfig");
const pgSession = require('connect-pg-simple')(session);
const pool = require("./db/pool");
const app = express()
const cors = require('cors')
const tradesRouter = require('./routes/tradesRouter')
const loginRouter = require('./routes/loginRouter')
const userRouter = require('./routes/userRouter');
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
require('express-async-errors')

logger.info('connecting to', config.DATABASE_URL)

// 1. Trust Proxy (REQUIRED for Render Cookies)
app.set('trust proxy', 1);

// 2. CORS - MOVED TO TOP (Best Practice)
// This ensures headers are sent even if the session fails or redirects.
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        'http://localhost:5173', 
        'http://127.0.0.1:5173',
        process.env.FRONTEND_URL // Must match exactly: https://option-website-one.vercel.app
      ];

      // Check if origin is allowed OR if it's a Vercel preview URL
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        console.log('Blocked by CORS:', origin); // <--- CHECK RENDER LOGS FOR THIS
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, 
  })
);

// 3. Session Middleware
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'user_sessions'
  }),
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api', tradesRouter)
app.use('/api', loginRouter)
app.use('/api', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app