const pool = require("../db/pool");
const passport = require("../passportConfig");

async function getUser(req, res) {
  const { email, password } = req.body;

  // Debug: Log the request body
  console.log('Received request with:', { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Proceed with authentication logic
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Server error during authentication' });
    }
    if (!user) {
      return res.status(400).json({ message: info.message || 'Invalid credentials' });
    }

    // Log in the user
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Server error during login' });
      }
      return res.json({ message: 'Login successful', user });
    });
  })(req, res);
}

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

module.exports = {
  getUser,
};