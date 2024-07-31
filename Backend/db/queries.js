const pool = require("./pool");

async function getAllTrades() {
  const { rows } = await pool.query("SELECT * FROM trades");
  return rows;
}

async function getAllStrategies() {
  const { rows } = await pool.query("SELECT * FROM trades, strategies WHERE strategies.strategyID = trades.strategyID");
  const { strats } = await pool.query("SELECT * FROM strategies");
  // const { rows } = await pool.query("SELECT strategy, strategyID FROM strategies");
  // const { rows } = await pool.query("SELECT * FROM trades");
  const allTrades = []
  let tradeArray = []
  let formatTrades = {};
//   let tradeArray = [];
//   // console.log({["strategy"]: rows});
//   let id;
//   for (const row of rows) {
//     const strategy = row.strategy;
//     const rowId = row.strategyid
//     if (!id || rowId !== id) {
//       id = rowId;
//       if (!formatTrades[strategy]) {
//         formatTrades = {};
//         formatTrades[strategy] = [row];
//       } else {
//         formatTrades[strategy].push(row);
//       }
//     } else {
//       formatTrades[strategy].push(row);
//     }
    
//     // if (!formatTrades[id]) {
//     //     formatTrades["strategy"] = [row];
//     // } else {
//     //     formatTrades["strategy"].push(row);
//     // }
// }
// console.log(formatTrades);
  let id
  let strategy
  rows.forEach((trades) => {
    if (!id || id !== trades.strategyid) {
      id = trades.strategyid;
      if (tradeArray.length !== 0) {
        console.log('length !== 0');
        formatTrades[strategy] = tradeArray;
        allTrades.push(formatTrades)
        formatTrades = {}
        tradeArray = []
      }
      strategy = trades.strategy;
      tradeArray.push(trades);

    } else {

      tradeArray.push(trades)
    }
    // console.log('==================');
    // console.log(tradeArray);
    // console.log('==================');
    });

  // rows.forEach((trades) => {
  //   const id = trades.strategyid;
  //   const strategy = trades.strategy;
  //   if (formatTrades.length)
  //   formatTrades[id] = formatTrades[id] || [];
  //   formatTrades[id].push(trades);
  //   });
    
  // console.log(allTrades);
  // const resultArray = Object.values(formatTrades);
  // console.log(resultArray);

  // const completeStrategy = rows.reduce((acc, trade) => {
  //   const id = trade.strategyid;
  //   (trade.strategy = acc[id] || []).push(trade);
  //   return acc;
  // }, {});

  // console.log(completeStrategy);
  // const resultArray = Object.values(completeStrategy);
  console.log({ "Trades" : allTrades });
  // console.log({ "Trades" : allTrades });
  return allTrades;
}

async function insertStrategy(tradeObj) {
  const strategyID = await pool.query(`INSERT INTO strategies (symbol, date, strategy, qty, strikes, value, expiration) 
                    VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7) RETURNING strategyID`, 
  [tradeObj.symbol], [Date.parse(tradeObj.date)], [tradeObj.strategy], [tradeObj.qty], [tradeObj.strikes], [tradeObj.value], [Date.parse(tradeObj.expiration)]);

  return strategyID
}
async function insertTrade(tradeObj, id) {
  await pool.query(`INSERT INTO trades (symbol, date, action, strategy, qty, price, strikes, value, expiration) 
    VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10)`, 
    [tradeObj.symbol], [Date.parse(tradeObj.date)], [tradeObj.action],
    [tradeObj.strategy], [tradeObj.qty], [tradeObj.price],
    [tradeObj.strikes], [tradeObj.value],  [Date.parse(tradeObj.expiration)], [id])

    // ('SPY', (DATE '07/29/2024'), 'SELL', 'PUT', 1, 1.50, 160, 150, (DATE '08/30/2024')),
  // await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function getLastID() {
  const id = await pool.query(`SELECT * FROM strategies
                    ORDER BY strategyID DESC
                    LIMIT 1;`)
  return id;
}

module.exports = {
  getAllTrades,
  getAllStrategies,
  insertTrade,
  insertStrategy
};