const db = require("../db/queries");

async function getTrades(req, res) {
  const strategies = await db.getAllStrategies()
  // const strategies = await db.getAllStrategies()
  res.json(strategies)
}

async function createUsernameGet(req, res) {
  res.render("users", {
    title: "User List",
  });
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

module.exports = {
  getTrades,
  createUsernameGet,
  createUsernamePost
};