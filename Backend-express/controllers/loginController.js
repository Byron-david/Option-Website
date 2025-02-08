const pool = require("../db/pool");
const client = pool.connect()
const bcrypt = require('bcryptjs');

async function getUser(req, res) {
  try {
    const result = await pool.query("SELECT id, username FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function createUser(req, res) {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await pool.query("insert into users (username, password) values ($1, $2)", [req.body.username, hashedPassword]);
      
      res.redirect("/");
  } catch (error) {
      console.error(error);
  }
};

module.exports = {
  getUser,
  createUser
};