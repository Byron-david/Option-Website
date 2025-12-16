import { useEffect } from 'react'
import { useTradeFormLogic } from '../../hooks/useTradeFormLogic'
import OptionItems from '../Input/OptionItems.jsx'
import Button from '../Button/Button.jsx'
import AddLeg from './AddLeg.jsx'
import AddStock from './AddStock.jsx'
import tradeService from '../../services/trades.js'
import formatTrade from '../../functions/formatTrade.js'
import styles from './AddTrade.module.css'; 
import { strategyOptions, action, subAction, posType } from '../../templates/tradeDefaults.js'

function UpdateTradeForm({ setAllTrades, handleClickClose, existingStrategy }) {
  // Use the Context hook instead of local state to be compatible with AddLeg/AddStock
  const {
    newTrade,
    setNewTrade,
    preset,
    stockVisible,
    setStockVisible,
    handleTrade,
    handleStock,
    handleStrategy,
    validateLegs
  } = useTradeFormLogic();

  // Load existing strategy data into Context on mount
  useEffect(() => {
    if (existingStrategy) {
      // 1. Determine Strategy Name
      const stratName = existingStrategy.strategy;
      
      // 2. Extract base info from first trade (symbol, date)
      const firstTrade = existingStrategy.trades[0];
      const symbol = firstTrade ? firstTrade.symbol : '';
      const date = firstTrade ? firstTrade.date.split('T')[0] : ''; // Format for date input

      // 3. Set Context State
      setNewTrade({
        strategy: stratName,
        symbol: symbol,
        date: date,
        trades: existingStrategy.trades.map(t => ({
          ...t,
          // Ensure dates are formatted for inputs if needed
          exp: t.expdate ? t.expdate.split('T')[0] : '',
          // Ensure numeric values are numbers
          qty: Number(t.qty),
          price: Number(t.price),
          value: Number(t.value),
          strikes: t.strikes // Ensure this matches AddLeg expectation
        }))
      });

      // 4. Update UI visibility
      setStockVisible(stratName === "Stock" || stratName === "Covered Call" ? 1 : 0);
    }
  }, [existingStrategy, setNewTrade, setStockVisible]);

  const updateTrade = async (event) => {
    event.preventDefault();
    
    // Use your formatTrade function to prepare payload
    const tradeObject = formatTrade(newTrade);

    // Override the strategy in the payload if needed
    tradeObject.newTrade.strategy = newTrade.strategy;

    try {
      // Backend requires a PUT route. 
      // If your backend doesn't support PUT, you might need to Delete & Re-create manually.
      // Assuming you will add a PUT route or use a workaround:
      const updatedStrategy = await tradeService.update(existingStrategy.strategyID, tradeObject);
      
      setAllTrades(prev => prev.map(t => 
        t.strategyID === updatedStrategy.strategyID ? updatedStrategy : t
      ));
      
      handleClickClose();
    } catch (err) {
      console.error("Failed to update trade:", err);
      alert("Failed to update. Ensure your backend supports editing.");
    }
  };

  return (
    <div className="containerTemplate">
      <div className="titleTemplate">Edit Trade</div>
      <form onSubmit={updateTrade}>
        <div className="bodyTemplate inputDark">
          <div className="inputContainer">
              <label>Symbol: 
                <input 
                  type="text" 
                  name="symbol" 
                  value={newTrade.symbol || ""} 
                  onChange={handleTrade}
                  placeholder="AAPL"
                  maxLength="4"
                />
              </label>
              <label>Date Exec.:
                <input 
                  type="date" 
                  name="date" 
                  value={newTrade.date || ""} 
                  onChange={handleTrade}
                />
              </label>
              <label className={styles.preset}>Strategy:
                <select 
                    className="inputSelect"
                    name="strategy"
                    value={newTrade.strategy}
                    onChange={handleStrategy}> 
                    <OptionItems items={strategyOptions}/>
                </select>
              </label>
          </div>

          <AddStock items={action}
                    handleChange={handleStock}
                    itemSubAction={subAction}
                    stockVisible={stockVisible}
                    setStockVisible={setStockVisible} />
          <AddLeg strategy={preset}
                  itemTypes={posType}
                  itemActions={action}
                  itemSubAction={subAction} />
        </div>
        <div className="footerTemplate">
          <Button text="Cancel" backgroundColor="var(--color-red)" handleClick={handleClickClose} />
          <Button type="submit" text="Update" className={styles.buttonSave} />
        </div>
      </form>
    </div>
  );
}

export default UpdateTradeForm;