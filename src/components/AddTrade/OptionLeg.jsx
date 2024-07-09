import Button from '../Button/Button.jsx'
import styles from './AddTrade.module.css'; 
import OptionItems from '../Input/OptionItems.jsx'

function OptionLeg({ strategy, inputs, handleClick, handleChange, items }) {
  let button;
  if (strategy === "custom") {
    button = <Button handleClick={handleClick} className="buttonRemove" />
  }

  return (
    <>
      <div className={styles.addOption}>
        {button}
        {/* <Button handleClick={handleClick} className="buttonRemove" /> */}
        <label>Type: 
          <select 
              className="inputSelect"
              name="posType"
              value={inputs.posType || ""}
              onChange={handleChange}>
              <OptionItems items={items}/>
          </select>
        </label>
        <label>Strike Price: 
          <input 
            required="required"
            placeholder="50"
            type="number" 
            name="strike" 
            value={inputs.strike || ""} 
            onChange={handleChange}
          />
        </label>
        <label>Value: 
          <input 
            required="required"
            placeholder="1,000"
            type="number" 
            name="tradeValue" 
            value={inputs.tradeValue || ""} 
            onChange={handleChange}
          />
        </label>
        <label>Quantity: 
          <input 
            placeholder="1"
            required="required"
            type="number" 
            name="quantity" 
            value={inputs.quantity || ""} 
            onChange={handleChange}
          />
        </label>
        <label>Expiration:
          <input 
            required="required"
            type="date" 
            name="expDate" 
            value={inputs.expDate || ""} 
            onChange={handleChange}
          />
        </label>
      </div>
    </>
  );
}

export default OptionLeg
