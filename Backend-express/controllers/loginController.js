const pool = require("../db/pool");
const client = pool.connect()

async function getUser(req, res) {
  try {
    const result = await pool.query("SELECT id, username FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getUser,
};