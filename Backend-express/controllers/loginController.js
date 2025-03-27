const pool = require("../db/pool");
const passport = require("../passportConfig");

const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: info.message 
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      
      console.log('Logged in user:', req.user); // Debug log
      
      return res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email
        }
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
  console.log('Session check:', req.session); // Debug log
  console.log('Authenticated user:', req.user); // Debug log
  
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