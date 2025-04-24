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