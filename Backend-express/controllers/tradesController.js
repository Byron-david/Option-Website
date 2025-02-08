const db = require("../db/queries");

async function getTrades(req, res) {
  const strategies = await db.getAllStrategies()
  res.json(strategies)
}

async function getTrade(req, res) {
  const id = req.params.id;

  if (id) {
    res.json(id)
  } else {
    res.status(404).end()
  }
}

async function addTrade(req, res) {
  const body = req.body;

  const id = await db.insertStrategy(body);
  await db.insertTrades(body, id);

  res.status(201).send(body);
}

async function removeTrade(req, res) {
  const id = req.params.id;

  try {
    const result = await db.deleteTrade(id)

    if (result.rowCount === 0) {
        return res.status(404).json({ message: `Trade ${id} not found.` });
    }

    res.json({ message: `Trade ${id} deleted successfully.`, deletedEntry: result.rows[0] });
} catch (error) {
    console.error('Error deleting entry:', error.message);
    res.status(500).json({ message: 'An error occurred while deleting the entry.' });
}
   
}



// tradesRouter.delete('/:id', async (request, response) => {
//   await Trade.findByIdAndDelete(request.params.id)
//   response.status(204).end()
// })

module.exports = {
  getTrades,
  getTrade,
  addTrade,
  removeTrade,
};