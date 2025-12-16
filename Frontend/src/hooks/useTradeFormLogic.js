// src/hooks/useTradeFormLogic.js
import { useTrade } from '../contexts/TradeContext';
import { defaultLeg } from '../templates/tradeDefaults';

export function useTradeFormLogic() {
  const {
    tradeState,
    setTradeState,
    preset,
    stockVisible,
    setStockVisible,
    handleTrade,
    handleStockChange,
    handleStrategyChange,
    resetForm
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
    setStockVisible,
    handleTrade,
    handleStock: handleStockChange,
    handleStrategy: handleStrategyChange,
    validateLegs,
    addNewLeg,
    resetForm
  };
}