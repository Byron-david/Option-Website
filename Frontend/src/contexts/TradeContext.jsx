import { createContext, useContext, useState } from 'react';

const TradeContext = createContext();

export function TradeProvider({ children }) {
  const [newTrade, setNewTrade] = useState({
    symbol: '',
    date: '',
    trades: []
  });

  return (
    <TradeContext.Provider value={{ newTrade, setNewTrade }}>
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