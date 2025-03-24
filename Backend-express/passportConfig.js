const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
// const { Pool } = require("pg");
const config = require('./utils/config')
const pool = require("./db/pool");

passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        console.log('Auth attempt for:', email); // Debug log
        
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
          console.log('No user found with email:', email);
          return done(null, false, { message: 'Incorrect email' });
        }
  
        const user = result.rows[0];
        console.log('User found:', user.id); // Debug log
        
        const isValid = await bcrypt.compare(password, user.password_hash);
        
        if (!isValid) {
          console.log('Invalid password for user:', user.id);
          return done(null, false, { message: 'Incorrect password' });
        }
  
        console.log('Authentication successful for user:', user.id);
        return done(null, user);
      } catch (err) {
        console.error('Auth error:', err);
        return done(err);
      }
    }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query('SELECT id, email FROM users WHERE id = $1', [id]);
      done(null, result.rows[0]);
    } catch (err) {
      done(err);
    }
  });

module.exports = passport;