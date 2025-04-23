import { createContext, useContext, useState } from 'react';
import { useTradeForm } from '../hooks/useTradeForm';

const TradeContext = createContext();

export function TradeProvider({ children }) {
  const tradeLogic = useTradeForm();
  return (
    <TradeContext.Provider value={tradeLogic}>
      {children}
    </TradeContext.Provider>
  );
}

export function useTrade() {
  const context = useContext(TradeContext);
  if (context === undefined) {
    throw new Error('useTrade must be used within a TradeProvider');
  }
  return context;
}