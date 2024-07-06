import Button from '../Button/Button.jsx'
import styles from './AddTrade.module.css'; 

function AddOption({ inputs, handleChange }) {
  return (
    <>
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
      <label>Expiration:
        <input 
          required="required"
          type="date" 
          name="expDate" 
          value={inputs.expDate || ""} 
          onChange={handleChange}
        />
      </label>
    </>
  );
}

export default AddOption
