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
const authRouter = require('./routes/authRouter');
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
require('express-async-errors')

logger.info('connecting to', config.DATABASE_URL)
  
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers)
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
  })
);

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// app.get('/check-auth', (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.json({ authenticated: true, user: req.user });
//   }
//   res.status(401).json({ authenticated: false });
// });
const router = express.Router();

// app.use('/', authRouter);
app.use('/dashboard', tradesRouter)
app.use('/signup', signupRouter)
app.use('/', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app