const db = require("../db/queries");

async function getTrades(req, res) {
  const strategies = await db.getAllStrategies()
  console.log(strategies)
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

// async function getTrades(req, res) {
//   try {
//     const username = req.params.username;
//     if (!username) {
//       return res.status(400).json({ message: "Username is required" });
//     }
    
//     const trades = await db.getTradesByUsername(username);
//     res.json(trades);
//   } catch (error) {
//     console.error('Error getting trades:', error.message);
//     res.status(500).json({ message: 'Error retrieving trades' });
//   }
// }

// async function getTrade(req, res) {
//   try {
//     const { username, id } = req.params;

//     if (!username || !id) {
//       return res.status(400).json({ message: "Username and trade ID are required" });
//     }

//     const trade = await db.getTradeByUsernameAndId(username, id);
    
//     if (!trade) {
//       return res.status(404).json({ message: "Trade not found" });
//     }
    
//     res.json(trade);
//   } catch (error) {
//     console.error('Error getting trade:', error.message);
//     res.status(500).json({ message: 'Error retrieving trade' });
//   }
// }

// async function addTrade(req, res) {
//   try {
//     const username = req.params.username;
//     const body = req.body;

//     if (!username) {
//       return res.status(400).json({ message: "Username is required" });
//     }

//     // Add username to the trade data
//     const tradeData = { ...body, username };
    
//     const id = await db.insertStrategy(tradeData);
//     await db.insertTrades(tradeData, id);

//     res.status(201).send(tradeData);
//   } catch (error) {
//     console.error('Error adding trade:', error.message);
//     res.status(500).json({ message: 'Error adding trade' });
//   }
// }

// async function removeTrade(req, res) {
//   try {
//     const { username, id } = req.params;

//     if (!username || !id) {
//       return res.status(400).json({ message: "Username and trade ID are required" });
//     }

//     const result = await db.deleteTradeByUsernameAndId(username, id);

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: `Trade ${id} not found for user ${username}.` });
//     }

//     res.json({ 
//       message: `Trade ${id} deleted successfully for user ${username}.`, 
//       deletedEntry: result.rows[0] 
//     });
//   } catch (error) {
//     console.error('Error deleting trade:', error.message);
//     res.status(500).json({ message: 'An error occurred while deleting the trade.' });
//   }
// }

module.exports = {
  getTrades,
  getTrade,
  addTrade,
  removeTrade,
};