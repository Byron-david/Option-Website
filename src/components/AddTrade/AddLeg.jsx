import Button from '../Button/Button.jsx'
import { useState } from 'react'
import OptionLeg from './OptionLeg.jsx'
import styles from './AddTrade.module.css'; 
import OptionItems from '../Input/OptionItems.jsx'
import OptionType from './OptionType.jsx';

function AddLeg({ leg, setLeg, strategy, itemTypes }) {
  const addNewLeg = () => {
    let newLeg = {
                    strike: '', 
                    posType: 'BUY', 
                    tradeValue: '', 
                    expDate: '', 
                    quantity: '', 
                  }

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

  return (
    <>
        {leg.map((option, index) => (
                  <div className={styles.addOption} key={index}>

                    {strategy === "custom" ? <Button handleClick={() => deleteLeg(index)} className="buttonRemove" /> : null}

                    <OptionType option={option}
                                items={itemTypes}
                                handleChange={e => handleLegChange(index, e)} />
                    {/* <label>Type: 
                      <select 
                          // className={option.posType === BUY ? `inputSelect ${styles.buySellButton}` : `inputSelect ${styles.buySellButton}`}
                          className="inputSelect"
                          style={option.posType === "BUY" ? {backgroundColor: `var(--background-color-button)`} : {backgroundColor: `var(--background-color-button-red)`}}
                          name="posType"
                          value={option.posType || ""}
                          onChange={e => handleLegChange(index, e)}>
                          <OptionItems items={itemTypes}/>
                      </select>
                    </label> */}
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
