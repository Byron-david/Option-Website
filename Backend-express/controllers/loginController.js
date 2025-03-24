const pool = require("../db/pool");
const passport = require("../passportConfig");

// async function getUser(req, res) {
//   try {
//     // Query the database to get user data
//     const result = await pool.query("SELECT id, email FROM users");

//     // Send the result back to the client
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

// const getUser = (req, res) => {
//   console.log("=============")
//     if (err) {
//       return res.status(500).json({ message: 'Server error during authentication' });
//     }
//     if (!user) {
//       return res.status(400).json({ message: info.message || 'Invalid credentials' });
//     }

//     // Log in the user
//     req.logIn(user, (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Server error during login' });
//       }
//       return res.json({ message: 'Login successful', user });
//     });
// }

// const getUser = (req, res) => {
//   // This will only be called if authentication succeeded
//   res.json({ 
//     message: 'Login successful',
//     user: {
//       id: req.user.id,
//       email: req.user.email
//       // Don't send sensitive data!
//     }
//   });
// };

const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ message: 'Server error during authentication' });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Invalid credentials' });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error('Login error:', loginErr);
        return res.status(500).json({ message: 'Session error' });
      }
      
      // Successful login
      return res.json({ 
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email
        },
        redirectTo: '/dashboard' // Add redirect path
      });
    });
  })(req, res, next);
};

const getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email
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
      res.clearCookie('connect.sid'); // Clear session cookie
      res.json({ message: 'Logout successful' });
    });
  });
};

const checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ 
      authenticated: true,
      user: req.user 
    });
  }
  res.json({ authenticated: false });
};

module.exports = {
  loginUser,
  getCurrentUser,
  logoutUser,
  checkAuth
};