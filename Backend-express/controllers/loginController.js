const pool = require("../db/pool");
const passport = require("../passportConfig");
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
  const { username, email, password } = req.body;

  // Validate inputs
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required' });
  }

  try {
    // Check if username or email already exists
    const existingUser = await pool.query(
      `SELECT 
        EXISTS(SELECT 1 FROM users WHERE username = $1) AS username_taken,
        EXISTS(SELECT 1 FROM users WHERE LOWER(email) = LOWER($2)) AS email_taken`,
      [username, email]
    );

    const { username_taken, email_taken } = existingUser.rows[0];

    if (username_taken) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    if (email_taken) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, created_at`,
      [username, email.toLowerCase(), hashedPassword]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0]
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
}

// const loginUser = (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (!user) return res.status(401).json({ error: info.message });
    
//     req.logIn(user, (err) => {
//       if (err) return res.status(500).json({ error: err.message });
//       return res.json({ 
//         user: {
//           id: user.id,
//           username: user.username
//         } 
//       });
//     });
//   })(req, res, next);
// };
const loginUser = (req, res, next) => {
  console.log('Login attempt with:', req.body); // Debug input
    // Destroy old session completely
  req.session.regenerate((err) => {
    if (err) return next(err);
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Auth error:', err);
        return res.status(500).json({ error: err.message });
      }
      
      if (!user) {
        console.log('Auth failed:', info.message);
        return res.status(401).json({ error: info.message });
      }
      
      req.login(user, (err) => { // Note: req.login() not req.logIn()
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ error: err.message });
        }
        
        console.log('Login successful. Session:', req.session); // Debug session
        console.log('Authenticated user:', req.user); // Should match user
        // return res.json({ user: req.user });
        return res.json({ 
          user: {
            id: user.id,
            username: user.username
          },
          sessionId: req.sessionID // Helpful for debugging
        });
      });
    })(req, res, next);
  })
};

const getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username
    }
  });
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logout successful' });
    });
  });
};

const checkAuth = (req, res) => {
  // console.log('Session check:', req.session); // Debug log
  console.log('checkAuth user:', req.user); // Debug log
  
  if (req.isAuthenticated()) {
    return res.json({ 
      authenticated: true,
      user: req.user 
    });
  }
  res.json({ authenticated: false });
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  checkAuth
};