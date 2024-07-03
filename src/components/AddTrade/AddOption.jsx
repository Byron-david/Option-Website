import Button from '../Button/Button.jsx'
import styles from './AddTrade.module.css'; 

function AddOption({ inputs, handleClick, handleChange }) {
  return (
    <>
      <div className={styles.addOption}>
        <Button handleClick={handleClick} className="buttonRemove" />
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
          <label>Strike Price: 
            <input 
              required="required"
              placeholder="1,000"
              type="number" 
              name="price" 
              value={inputs.price || ""} 
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

export default AddOption
