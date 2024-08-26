import styles from './AddTrade.module.css'; 
import OptionAction from './OptionAction.jsx';
import OptionItems from '../Input/OptionItems.jsx';
import { defaultStock } from '../../../public/tradeDefaults.js'
import Button from '../Button/Button.jsx'

function AddStock({ strategy, stock, handleChange, items, itemSubAction, stockVisible, setStockVisible, setNewTrade }) {
  if (stockVisible === 0) {
    return null
  }

  let stockValue = 0;
  if (stock.price !== '' && stock.qty !== '') {
    stockValue = stock.price * stock.qty
    stock.value = stockValue
  }

  const deleteStock = () => {
    setNewTrade(values => ({
      ...values, 
      stock: {}
    }))
    setStockVisible(0)
  }

  return (
    <>
      <div className={styles.addOption}>
        <span>Stock:&nbsp;&nbsp;&nbsp;</span>
        <Button handleClick={() => deleteStock()} className={styles.buttonRemove} />
        <OptionAction option={stock}
            items={items}
            handleChange={handleChange} />
        <label>Open/Close: 
          <select 
              className="inputSelect"
              name="sub_action"
              value={stock.sub_action || ""}
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



