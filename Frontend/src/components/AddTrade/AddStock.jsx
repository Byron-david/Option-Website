import styles from './AddTrade.module.css'; 
import OptionAction from './OptionAction.jsx';
import OptionItems from '../Input/OptionItems.jsx';

function AddStock({ strategy, stock, handleChange, items, itemSubAction }) {
  if (strategy !== "Stock" && strategy !== "Covered Call") return null

  let stockValue = 0;
  if (stock.price !== '' && stock.qty !== '') {
    stockValue = stock.price * stock.qty
    stock.value = stockValue
  }

  return (
    <>
      <div className={styles.addOption}>
        <OptionAction option={stock}
            items={items}
            handleChange={handleChange} />
        <label>Open/Close: 
            <select 
                className="inputSelect"
                name="subAction"
                value={stock.subAction || ""}
                onChange={handleChange}>
                <OptionItems items={itemSubAction}/>
            </select>
          </label>
        <label>Price: 
            <input 
            type="number" 
            name="price" 
            value={stock.price || ""} 
            onChange={handleChange}
            placeholder="100"
            />
        </label>
        <label>Value: 
            <input 
            type="number" 
            name="value" 
            value={stock.value || ""} 
            onChange={handleChange}
            placeholder="10,000"
            readOnly/>
        </label>
        <label>Quantity: 
            <input 
            type="number" 
            name="qty" 
            value={stock.qty || ""} 
            onChange={handleChange}
            placeholder="1"
            />
        </label>

      </div>
    </>
  );
}

export default AddStock



