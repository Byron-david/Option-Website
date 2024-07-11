import Button from '../Button/Button.jsx'
import { useState } from 'react'
import OptionLeg from './OptionLeg.jsx'
import styles from './AddTrade.module.css'; 
import OptionItems from '../Input/OptionItems.jsx'
import OptionAction from './OptionAction.jsx';

function AddLeg({ leg, setLeg, newLeg, strategy, itemTypes, itemActions }) {
  const addNewLeg = () => {
    // 3 legs max
    if (leg.length <= 2) setLeg([...leg, newLeg])
  }

  const deleteLeg = (index) => {
    let data = [...leg];
    data.splice(index, 1)
    setLeg(data)
  }

  const handleLegChange = (index, event) => {
    let { name, value } = event.target;
    let onChangeValue = [...leg];
    onChangeValue[index][name] = value;
    setLeg(onChangeValue);
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
                    <label>Type: 
                      <select 
                          className="inputSelect"
                          name="posType"
                          value={option.posType || ""}
                          onChange={e => handleLegChange(index, e)}>
                          <OptionItems items={itemTypes}/>
                      </select>
                    </label>
                    <label>Strike Price: 
                      <input 
                        required="required"
                        placeholder="50"
                        type="number" 
                        name="strike" 
                        value={option.strike || ""} 
                        onChange={e => handleLegChange(index, e)}
                      />
                    </label>
                    <label>Value: 
                      <input 
                        required="required"
                        placeholder="1,000"
                        type="number" 
                        name="tradeValue" 
                        value={option.tradeValue || ""} 
                        onChange={e => handleLegChange(index, e)}
                      />
                    </label>
                    <label>Quantity: 
                      <input 
                        placeholder="1"
                        required="required"
                        type="number" 
                        name="quantity" 
                        value={option.quantity || ""} 
                        onChange={e => handleLegChange(index, e)}
                      />
                    </label>
                    <label>Expiration:
                      <input 
                        required="required"
                        type="date" 
                        name="expDate" 
                        value={option.expDate || ""} 
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
