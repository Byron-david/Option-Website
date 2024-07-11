import styles from './AddTrade.module.css'; 
import OptionAction from './OptionAction.jsx';

function AddStock({ strategy, trade, handleChange, items }) {
    if (strategy === "stock" || strategy === "coveredCall") 
  return (
    <>
      <div className={styles.addOption}>
        <OptionAction option={trade}
            items={items}
            handleChange={handleChange} />

        <label>Value: 
            <input 
            type="number" 
            name="tradeValue" 
            value={trade.tradeValue || ""} 
            onChange={handleChange}
            />
        </label>
        <label>Quantity: 
            <input 
            type="number" 
            name="quantity" 
            value={trade.quantity || ""} 
            onChange={handleChange}
            placeholder="1"
            />
        </label>
      </div>
    </>
  );
}

export default AddStock



