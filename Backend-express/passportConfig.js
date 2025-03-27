const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./db/pool');

// Local Strategy Configuration
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false
  },
  async (username, password, done) => {
    try {
      // Custom verification logic
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1', 
        [username.trim()]
      );
      
      if (result.rows.length === 0) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const user = result.rows[0];
      
      // Password validation
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password' });
      }

      // Successful authentication
      return done(null, {
        id: user.id,
        username: user.username,
        // role: user.role || 'user' // Add role if using RBAC
      });
    } catch (err) {
      return done(err);
    }
  }
));

// Session Serialization
passport.serializeUser((user, done) => {
  done(null, user.id); // Only store user ID in session
});

// Session Deserialization
passport.deserializeUser(async (id, done) => {
  console.log("ID: ", id)
  try {
    const result = await pool.query(
      'SELECT id, username FROM users WHERE id = $1', 
      [id]
    );
    done(null, result.rows[0] || null);
    console.log("DESERIALIZE: ", result.rows[0])
  } catch (err) {
    done(err);
  }
});

module.exports = passport;