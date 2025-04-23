// src/hooks/useTradeFormLogic.js
import { useTrade } from '../contexts/TradeContext';

export function useTradeFormLogic() {
  const {
    tradeState,
    setTradeState,
    preset,
    stockVisible,
    handleTrade,
    handleStockChange,
    handleStrategyChange
  } = useTrade();

  // Additional derived logic
  const validateLegs = () => {
    const options = tradeState.trades.filter(t => t.trade_type !== 'STOCK');
    const stocks = tradeState.trades.filter(t => t.trade_type === 'STOCK');
    
    switch(tradeState.strategy) {
      case "Covered Call":
        return stocks.length === 1 && options.length === 1;
      case "Iron Condor":
        return options.length === 4;
      default:
        return true;
    }
  };

  const addNewLeg = () => {
    setTradeState(prev => ({
      ...prev,
      trades: [...prev.trades, { ...defaultLeg }]
    }));
  };

  return {
    newTrade: tradeState,
    setNewTrade: setTradeState,
    preset,
    stockVisible,
    handleTrade,
    handleStock: handleStockChange,
    handleStrategy: handleStrategyChange,
    validateLegs,
    addNewLeg
  };
}