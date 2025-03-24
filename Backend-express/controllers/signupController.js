const bcrypt = require('bcryptjs');
const pool = require('../db/pool');

async function createUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the email already exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    const newUser = result.rows[0];
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

module.exports = {
  createUser
};