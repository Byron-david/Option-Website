import { useState } from 'react'
import TextInput from '../Input/TextInput.jsx'
import DateInput from '../Input/DateInput.jsx'
import Button from '../Button/Button.jsx'
import styles from './AddTrade.module.css'; 


// [ {"Iron Condor": [strike 1], 
                  // [strike 2],
                  // [strike 3],
                  // [strike 4],
// } ]

function AddOption({ inputs, handleClick, strikePrice, optionValue, quantity, exp }) {
  return (
    <>
      <Button handleClick={handleClick} className="buttonRemove" />
      <div className={styles.addOption}>
      <div className="inputContainer">
          <label>Strike Price: 
            <input 
              type="number" 
              name="strike" 
              value={inputs.strategy[0].strike || ""} 
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="inputContainer">
          <label>Expiration:
            <input 
              type="date" 
              name="expDate" 
              value={inputs.expDate || ""} 
              onChange={handleChange}
            />
          </label>
        </div>          
        <div className="inputContainer">
          <label>Quantity: 
            <input 
              type="number" 
              name="quantity" 
              value={inputs.quantity || ""} 
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="inputContainer">
          <label>Date Exec.:
            <input 
              type="date" 
              name="dateExec" 
              value={inputs.dateExec || ""} 
              onChange={handleChange}
            />
          </label>
        </div>     
        {/* <TextInput placeholder="50" inputType="number" id={strikePrice} name={strikePrice} htmlFor={strikePrice} text="Strike Price:" />
        <TextInput placeholder="1,000" inputType="number" id={optionValue} name={optionValue} htmlFor={optionValue} text="Value:" />
        <TextInput placeholder="1" id={quantity} inputType="number" name={quantity} htmlFor={quantity} text="Qty:" />
        <DateInput id={exp} name={exp} htmlFor={exp} text="Exp. Date" /> */}
      </div>
    </>
  );
}

export default AddOption
