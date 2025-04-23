import { useState } from 'react';
import { defaultStock, defaultLeg, strategyOptions } from '../../public/tradeDefaults'
import { useTrade } from '../contexts/TradeContext';

export function useTradeFormLogic(setStrategy) {
    const { newTrade, setNewTrade } = useTrade();
  const [preset, setPreset] = useState("Stock")
  const [stockVisible, setStockVisible] = useState(1)

  const handleTrade = (e) => {
    setNewTrade(values => ({
      ...values, [e.target.name]: e.target.value.toUpperCase()
    //   base: { ...values.base, [e.target.name]: e.target.value.toUpperCase() }
    }))
  }

  const handleStock = (e) => {
    setNewTrade(values => ({
      ...values,
      stock: { ...values.stock, [e.target.name]: e.target.value }
    }))
  }

  const handleStrategy = (e) => {
    const updateStrategy = e.target.value;
    setStrategy(updateStrategy);
    setStockVisible(updateStrategy === "Stock" || updateStrategy === "Covered Call" ? 1 : 0);
  
    setNewTrade(values => {
      const newTrades = [];
      const strategyConfig = strategyOptions.find(item => item.value === updateStrategy);
  
      // Add stock if needed
      if (updateStrategy === "Stock" || updateStrategy === "Covered Call") {
        newTrades.push({ ...defaultStock });
      }
  
      // Add option legs
      for (let i = 0; i < strategyConfig.quantity; i++) {
        const newLeg = { ...defaultLeg };
  
        // Strategy-specific adjustments
        if (i > 0 && i < 3) newLeg.action = "SELL";
        if (updateStrategy === "Iron Condor" && i < 2) newLeg.trade_type = "PUT";
        if (updateStrategy === "Butterfly") {
          if (i === 1) newLeg.qty = 2;
          if (i === 2) newLeg.action = "BUY";
        }
        if (updateStrategy === "Covered Call") newLeg.action = "SELL";
        if (updateStrategy === "Strangle") {
          newLeg.action = "SELL";
          if (i < 1) newLeg.trade_type = "PUT";
        }
  
        newTrades.push(newLeg);
      }
  
      return { 
        ...values, 
        trades: newTrades,
        strategy: updateStrategy 
      };
    });
  };

  const validateLegs = () => {
    const optionLegs = newTrade.trades?.filter(t => t.trade_type !== 'STOCK') || [];
    
    // Strategy-specific validation
    switch(strategy) {
      case "Vertical Spread":
      case "Strangle":
        return optionLegs.length === 2;
      case "Iron Condor":
        return optionLegs.length === 4;
      case "Butterfly":
        return optionLegs.length === 3;
      case "Covered Call":
        return newTrade.trades.some(t => t.trade_type === 'STOCK') && 
               optionLegs.length === 1;
      default: // Stock or Single Option
        return true;
    }
  };

  // These functions only used with adding and deleting stocks
  const addNewLeg = () => {
    const newLeg = { ...defaultLeg }
    setNewTrade(values => {
      if (values.legs.length <= 3) {
        return { ...values, trades: [...values.legs, newLeg] }
      }
      return values
    })
  }

  const addStock = (e) => {
    e.preventDefault()
    if (stockVisible === 0) {
      setNewTrade(values => ({ ...values, stock: { ...defaultStock } }))
      setStockVisible(1)
    }
  }

  return {
    preset,
    setPreset,
    stockVisible,
    setStockVisible,
    handleTrade,
    handleStock,
    handleStrategy,
    addNewLeg,
    addStock,
    validateLegs
  }
}