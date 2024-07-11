import styles from './AddTrade.module.css'; 
import OptionAction from './OptionAction.jsx';

function AddStock({ strategy, stock, handleChange, items }) {
  let stockValue = 0;
  if (stock.tradePrice !== '' && stock.quantity !== '') {
    stockValue = stock.tradePrice * stock.quantity
  }

  if (strategy === "stock" || strategy === "coveredCall") 
  return (
    <>
      <div className={styles.addOption}>
        <OptionAction option={stock}
            items={items}
            handleChange={handleChange} />
        <label>Price: 
            <input 
            type="number" 
            name="tradePrice" 
            value={stock.tradePrice || ""} 
            onChange={handleChange}
            placeholder="100"
            />
        </label>
        <label>Value: 
            <input 
            type="number" 
            name="tradeValue" 
            value={stockValue} 
            onChange={handleChange}
            placeholder="10,000"
            />
        </label>
        <label>Quantity: 
            <input 
            type="number" 
            name="quantity" 
            value={stock.quantity || ""} 
            onChange={handleChange}
            placeholder="1"
            />
        </label>
      </div>
    </>
  );
}

export default AddStock



