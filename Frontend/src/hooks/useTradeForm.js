// src/hooks/useTradeForm.js
import { useState } from 'react';
import { defaultStock, defaultLeg, strategyOptions } from '../../public/tradeDefaults';

const initialDefaultState = {
  symbol: '',
  date: '',
  trades: [{ ...defaultStock }],
  strategy: 'Stock'
};

export function useTradeForm(initialState = {
  symbol: '',
  date: '',
  trades: [{ ...defaultStock }],
  strategy: 'Stock'
}) {
  const [tradeState, setTradeState] = useState(initialState);
  const [preset, setPreset] = useState("Stock");
  const [stockVisible, setStockVisible] = useState(1);

  // Core business logic functions
  const handleTrade = (e) => {
    const { name, value } = e.target;
    setTradeState(prev => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setTradeState(prev => ({
      ...prev,
      trades: prev.trades.map(trade => 
        trade.trade_type === 'STOCK' ? { ...trade, [name]: value } : trade
      )
    }));
  };

  const createStrategyLeg = (strategy, index) => {
    const leg = { ...defaultLeg };
    
    if (strategy === "Covered Call" || strategy === "Strangle") leg.action = "SELL";

    if (strategy === "Vertical Spread" && index == 1) {
      leg.action = "SELL"
    }
    if (strategy === "Iron Condor") {
      if (index < 2) leg.trade_type = "PUT"

      if (index === 1 || index === 2) {
        leg.action = "SELL"
      }
    }
    if (strategy === "Butterfly" && index === 1) {
      leg.qty = 2;
      leg.action = "SELL"
    } 
    
    return leg;
  };

  const handleStrategyChange = (e) => {
    const strategy = e.target.value;
    setPreset(strategy);
    setStockVisible(strategy === "Stock" || strategy === "Covered Call" ? 1 : 0);

    setTradeState(prev => {
      const newTrades = [];
      const config = strategyOptions.find(s => s.value === strategy);

      if (strategy === "Stock" || strategy === "Covered Call") {
        newTrades.push({ ...defaultStock });
      }

      for (let i = 0; i < config.quantity; i++) {
        newTrades.push(createStrategyLeg(strategy, i));
      }

      return { ...prev, trades: newTrades, strategy };
    });
  };

  const resetForm = () => {
    setTradeState(initialDefaultState);
    setPreset("Stock");
    setStockVisible(1);
  };

  return {
    tradeState,
    setTradeState,
    preset,
    setPreset,
    stockVisible,
    setStockVisible,
    handleTrade,
    handleStockChange,
    handleStrategyChange,
    resetForm
  };
}