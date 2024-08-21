import Button from '../Button/Button.jsx'
import { useState } from 'react'
import OptionLeg from './OptionLeg.jsx'
import styles from './AddTrade.module.css'; 
import OptionItems from '../Input/OptionItems.jsx'
import OptionAction from './OptionAction.jsx';

function AddLeg({ leg, setNewTrade, newLeg, strategy, itemTypes, itemActions, itemSubAction }) {
  const addNewLeg = () => {
    // 3 legs max
    if (leg.length <= 2) setNewTrade([...leg, newLeg])
  }

  const deleteLeg = (index) => {
    let data = [...leg];
    data.splice(index, 1)
    setNewTrade(data)
  }

  const handleLegChange = (index, event) => {
    let { name, value } = event.target;
    let onChangeValue = [...leg];
    onChangeValue[index][name] = value;
    setNewTrade(values => ({
      ...values, 
      legs: onChangeValue
    }))
  }

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
        {leg.map((option, index) => (
                  <div className={styles.addOption} key={index}>

                    {strategy === "custom" ? <Button handleClick={() => deleteLeg(index)} className="buttonRemove" /> : null}

                    <OptionAction option={option}
                                items={itemActions}
                                handleChange={e => handleLegChange(index, e)} />
                    <label>Open/Close: 
                      <select 
                          className="inputSelect"
                          name="sub_action"
                          value={option.sub_action || ""}
                          onChange={e => handleLegChange(index, e)}>
                          <OptionItems items={itemSubAction}/>
                      </select>
                    </label>
                    <label>Type: 
                      <select 
                          className="inputSelect"
                          name="trade_type"
                          value={option.trade_type || ""}
                          onChange={e => handleLegChange(index, e)}>
                          <OptionItems items={itemTypes}/>
                      </select>
                    </label>
                    <label>Strike Price: 
                      <input 
                        required="required"
                        placeholder="50"
                        type="number" 
                        name="strikes" 
                        value={option.strikes || ""} 
                        onChange={e => handleLegChange(index, e)}
                      />
                    </label>
                    <label>Value: 
                      <input 
                        required="required"
                        placeholder="1,000"
                        type="number" 
                        name="value" 
                        value={option.value || ""} 
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
      {addButton}
    </>
  );
}

export default AddLeg
