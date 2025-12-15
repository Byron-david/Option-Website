const valueAdjust = (combinedTrade, value) => {
    combinedTrade.map(t => t.action === "BUY" ? t[value] = `${t[value] * -1}` : t[value] )
  }

const formatTrade = (newTrade) => {
    // let combinedTrade = []

    // const stockTrade = newTrade.trades.find(t => t.trade_type === 'STOCK') || {};
        
    // if (newTrade.trades.length !== 0 && stockTrade) {
    //   const newStock = {...newTrade, ...newTrade.stock}
    //   const newLeg = newTrade.trades.map(prev => ({...newTrade, ...prev}))
    //   combinedTrade = combinedTrade.concat(newStock, ...newLeg)
    // }
    // else if (newTrade.trades.length !== 0) {
    //   combinedTrade = newTrade.trades.map(prev => ({...newTrade, ...prev}))

    // }
    // else {
    //   combinedTrade = [{...newTrade, ...newTrade.stock}]
    // }

    valueAdjust(newTrade.trades, "value")
    valueAdjust(newTrade.trades, "price")

    return {newTrade}
}

export default formatTrade

// const valueAdjust = (combinedTrade, field) => {
//     combinedTrade.forEach(t => {
//       // Safely parse the value, defaulting to 0 if missing or invalid
//       let val = parseFloat(t[field]);
//       if (isNaN(val)) val = 0;
  
//       if (t.action === "BUY") {
//         // Invert value for BUYS (Debit)
//         t[field] = (val * -1).toString();
//       } else {
//         // Ensure it's a string for consistency
//         t[field] = val.toString();
//       }
//     });
//   }
  
//   const formatTrade = (newTrade) => {
//       // Pass the trades array to be adjusted
//       if (newTrade && newTrade.trades) {
//         valueAdjust(newTrade.trades, "value")
//         valueAdjust(newTrade.trades, "price")
//       }
  
//       return { newTrade }
//   }
  
//   export default formatTrade