// authRoutes.js
const express = require('express');
const authRouter = express.Router();

authRouter.get('/check-auth', (req, res) => {
    console.log('Session check:', req.session); // Debug log
    console.log('Authenticated user:', req.user); // Debug log
    
    if (req.isAuthenticated()) {
      return res.json({ 
        authenticated: true,
        user: {
          id: req.user.id,
          email: req.user.email
        }
      });
    }
    res.status(401).json({ authenticated: false });
  });

module.exports = authRouter;