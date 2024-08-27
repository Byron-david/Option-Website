const valueAdjust = (combinedTrade, value) => {
    combinedTrade.map(t => t.action === "BUY" ? t[value] = `${t[value] * -1}` : t[value] )
  }

const formatTrade = (newTrade, strategy) => {
    let combinedTrade = []
        
    if (newTrade.legs.length !== 0 && Object.keys(newTrade.stock).length !== 0) {
      const newStock = {...newTrade.base, ...newTrade.stock}
      const newLeg = newTrade.legs.map(prev => ({...newTrade.base, ...prev}))
      combinedTrade = combinedTrade.concat(newStock, ...newLeg)
    }
    else if (newTrade.legs.length !== 0) {
      combinedTrade = newTrade.legs.map(prev => ({...newTrade.base, ...prev}))

    }
    else {
      combinedTrade = [{...newTrade.base, ...newTrade.stock}]
    }

    valueAdjust(combinedTrade, "value")
    valueAdjust(combinedTrade, "price")

    return {[strategy]: combinedTrade}
}

export default formatTrade