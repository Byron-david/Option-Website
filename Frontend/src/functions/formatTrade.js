const valueAdjust = (combinedTrade, value) => {
    combinedTrade.map(t => t.action === "BUY" ? t[value] = `${t[value] * -1}` : t[value] )
  }

const formatTrade = (newTrade) => {
    // Fix: Map frontend 'exp' to backend 'expdate'
    if (newTrade.trades) {
        newTrade.trades.forEach(trade => {
            if (trade.exp) {
                trade.expdate = trade.exp;
            }
        });
    }

    // Existing value adjustments
    valueAdjust(newTrade.trades, "value")
    valueAdjust(newTrade.trades, "price")

    return {newTrade}
}

export default formatTrade