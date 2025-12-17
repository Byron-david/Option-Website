import { useTradeFormLogic } from '../../hooks/useTradeFormLogic'
import { useState } from 'react'
import OptionItems from '../Input/OptionItems.jsx'
import Button from '../Button/Button.jsx'
import AddLeg from './AddLeg.jsx'
import AddStock from './AddStock.jsx';
import styles from './AddTrade.module.css'; 
import { 
  defaultStock, 
  defaultLeg, 
  strategyOptions, 
  action, 
  subAction, 
  posType } from '../../../public/tradeDefaults.js'

function TradeForm({ handleClickClose, onSubmit,  strategy }) {
  const {
    newTrade,
    preset,
    stockVisible,
    setStockVisible,
    handleTrade,
    handleStock,
    handleStrategy,
    addNewLeg,
    addStock,
    validateLegs
  } = useTradeFormLogic();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   if (!validateLegs()) {
  //     alert(`Invalid leg count for ${strategy} strategy!`);
  //     return;
  //   }
    
  //   onSubmit(e); // Proceed with original submission
  // };

  return (
    <>
      <form action ="/trades" onSubmit={onSubmit} method="POST">
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
          {/* <div>
            <Button handleClick={addStock}
                      className={styles.buttonAdd}
                      text="Add Stock" />
            <Button handleClick={addNewLeg}
                      className={styles.buttonAdd}
                      text="Add Option" />
          </div> */}
        </div>
        <div className="footerTemplate">
          <Button text="Cancel" backgroundColor="var(--color-red)" handleClick={handleClickClose} />
          <Button type="submit" text="Save" className={styles.buttonSave} />
        </div>
      </form>
    </>
  );
}

export default TradeForm
