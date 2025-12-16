const valueAdjust = (combinedTrade, value) => {
  // Return a new array with modified objects
  return combinedTrade.map(t => {
    if (t.action === "BUY") {
      return { ...t, [value]: `${t[value] * -1}` };
    }
    return t;
  });
}

const formatTrade = (newTrade) => {
    // Create a deep copy of trades to avoid mutating state
    let tradesCopy = newTrade.trades.map(t => ({...t}));

    tradesCopy = valueAdjust(tradesCopy, "value");
    tradesCopy = valueAdjust(tradesCopy, "price");

    // Return the new structure with the modified trades copy
    return {
      newTrade: {
        ...newTrade,
        trades: tradesCopy
      }
    };
}

export default formatTrade