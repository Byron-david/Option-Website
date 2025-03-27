const pool = require("../db/pool");

async function checkUsername(req, res) {
  try {
    const { username } = req.body;
    const result = await pool.query(
      'SELECT 1 FROM users WHERE username = $1 LIMIT 1',
      [username]
    );
    res.json({ exists: result.rowCount > 0 });
  } catch (err) {
    console.error('Username check error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

async function checkEmail(req, res) {
  try {
    const { email } = req.body;
    const result = await pool.query(
      'SELECT 1 FROM users WHERE email = $1 LIMIT 1',
      [email.toLowerCase()]
    );
    res.json({ exists: result.rowCount > 0 });
  } catch (err) {
    console.error('Email check error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  checkUsername,
  checkEmail
};