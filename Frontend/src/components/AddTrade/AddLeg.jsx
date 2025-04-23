import { useTradeFormLogic } from '../../hooks/useTradeFormLogic'
import Button from '../Button/Button.jsx'
import { useState } from 'react'
import OptionLeg from './OptionLeg.jsx'
import styles from './AddTrade.module.css'; 
import OptionItems from '../Input/OptionItems.jsx'
import OptionAction from './OptionAction.jsx';
import { defaultLeg } from '../../../public/tradeDefaults.js'

function AddLeg({ strategy, itemTypes, itemActions, itemSubAction }) {
  const { newTrade, setNewTrade } = useTradeFormLogic();

    // Use trades array consistently (recommended to standardize on either 'trades' or 'legs')
  const legs = newTrade.trades?.filter(trade => trade.trade_type !== 'STOCK') || [];
  // const leg = newTrade.legs

  const addNewLeg = () => {
    const newLeg = { ...defaultLeg };
    
    if (legs.length <= 2) {
      setNewTrade(values => ({
        ...values, 
        trades: [...values.trades, newLeg] 
      }));
    }
  };

  const deleteLeg = (index) => {
    setNewTrade(values => {
      // Get all non-stock legs
      const nonStockLegs = values.trades.filter(trade => trade.trade_type !== 'STOCK');
      
      // If we're deleting the last option leg
      if (nonStockLegs.length === 1) {
        return {
          ...values,
          trades: values.trades.filter(trade => trade.trade_type === 'STOCK')
        };
      }
      
      // For other cases, find and remove the specific leg
      let foundCount = 0;
      const updatedTrades = values.trades.filter((trade, i) => {
        if (trade.trade_type !== 'STOCK') {
          if (foundCount === index) {
            return false; // Skip this one
          }
          foundCount++;
        }
        return true;
      });
      
      return { ...values, trades: updatedTrades };
    });
  };

  const handleLegChange = (index, event) => {
    const { name, value } = event.target;
    
    setNewTrade(values => {
      // Get all non-stock legs first
      const nonStockLegs = values.trades.filter(trade => trade.trade_type !== 'STOCK');
      
      // Create a new array with all trades
      const updatedTrades = [...values.trades];
      
      // Find the position of the leg we want to update in the full trades array
      let foundCount = 0;
      for (let i = 0; i < updatedTrades.length; i++) {
        if (updatedTrades[i].trade_type !== 'STOCK') {
          if (foundCount === index) {
            // Update the specific leg
            updatedTrades[i] = { 
              ...updatedTrades[i], 
              [name]: value 
            };
            break;
          }
          foundCount++;
        }
      }
      
      return { ...values, trades: updatedTrades };
    });
  };

  let addButton;
  if (strategy === "custom") {
    addButton = <Button handleClick={addNewLeg}
                      className="buttonAdd"
                      text="+ Add Option" />
  }

  // let tradeValueAdjust
  // if (option.action === "BUY") {
  //   tradeValueAdjust = option.tradeValue * -1
  // }

  return (
    <>

        {legs.map((option, index) => (
                  <div className={styles.addOption} key={index}>
                    <span>Option:&nbsp;&nbsp;&nbsp;</span>

                    {/* {strategy === "custom" ? <Button handleClick={() => deleteLeg(index)} className="buttonRemove" /> : null} */}
                    {/* <Button handleClick={() => deleteLeg(index)} className={styles.buttonRemove} /> */}

                    <OptionAction option={option}
                                items={itemActions}
                                handleChange={e => handleLegChange(index, e)} />
                    <label>Open/Close: 
                      <select 
                          name="sub_action"
                          value={option.sub_action || ""}
                          onChange={e => handleLegChange(index, e)}>
                          <OptionItems items={itemSubAction}/>
                      </select>
                    </label>
                    <label>Type: 
                      <select 
                          name="trade_type"
                          step="0.01"
                          value={option.trade_type || ""}
                          onChange={e => handleLegChange(index, e)}>
                          <OptionItems items={itemTypes}/>
                      </select>
                    </label>
                    <label>Strike Price: 
                      <input 
                        required="required"
                        placeholder="150"
                        type="number" 
                        name="strikes" 
                        value={option.strikes || ""} 
                        onChange={e => handleLegChange(index, e)}
                      />
                    </label>
                    <label>Option Price: 
                      <input 
                        required="required"
                        placeholder="2.50"
                        id="optionPrice"
                        type="number" 
                        name="value" 
                        value={option.value} 
                        onChange={e => handleLegChange(index, e)}
                      />
                    </label>
                    <label>Quantity: 
                      <input 
                        placeholder="1"
                        required="required"
                        type="number" 
                        name="qty" 
                        value={option.qty || ""} 
                        onChange={e => handleLegChange(index, e)}
                      />
                    </label>
                    <label>Expiration:
                      <input 
                        required="required"
                        type="date" 
                        name="exp" 
                        value={option.exp || ""} 
                        onChange={e => handleLegChange(index, e)}
                      />
                    </label>
                  </div>
            ))}
            {/* <div>
              <Button handleClick={addNewLeg}
                        className={styles.buttonAdd}
                        text="+ Add Option" />
            </div> */}

    </>
  );
}

export default AddLeg
