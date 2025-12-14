import { useEffect, useState } from 'react'
import { useTradeFormLogic } from '../../hooks/useTradeFormLogic'
import tradeService from '../../services/trades.js'
import TradeForm from './TradeForm.jsx';
import formatTrade from '../../functions/formatTrade.js'

export default function UpdateTradeForm({ currentTrade, setAllTrades, handleClickClose }) {
  // Reuse the exact same logic hook as the Add form
  const { newTrade, setNewTrade } = useTradeFormLogic();
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentTrade && currentTrade.trades && currentTrade.trades.length > 0) {
      const firstLeg = currentTrade.trades[0];
      
      // Map DB structure back to Form State structure
      const formState = {
        strategy: currentTrade.strategy,
        symbol: firstLeg.symbol,
        // Format date to YYYY-MM-DD for the input
        date: firstLeg.date ? new Date(firstLeg.date).toISOString().split('T')[0] : '', 
        trades: currentTrade.trades.map(t => ({
          ...t,
          // Ensure we don't carry over negative numbers to the inputs if your form expects positives
          price: Math.abs(t.price),
          value: Math.abs(t.value),
        }))
      };

      setNewTrade(formState);
    }
  }, [currentTrade, setNewTrade]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    
    // Use your existing formatter
    const tradeObject = formatTrade(newTrade);
    
    // Get the Strategy ID (handle Postgres capitalization quirks)
    const strategyId = currentTrade.strategyid || currentTrade.strategyID || currentTrade.id;

    try {
      const updatedStrategy = await tradeService.update(strategyId, tradeObject);
      
      // Update the table list locally without refreshing
      setAllTrades(prevTrades => prevTrades.map(t => 
        (t.strategyid || t.strategyID || t.id) === strategyId ? updatedStrategy : t
      ));
      
      handleClickClose();
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update trade");
    }
  }

  return (
    <div className="containerTemplate">
      <div className="titleTemplate">Edit Trade</div>
      
      <TradeForm 
        onSubmit={handleUpdate} 
        handleClickClose={handleClickClose} 
      />
      
      {error && <div style={{color: 'red', padding: '10px'}}>{error}</div>}
    </div>
  );
}