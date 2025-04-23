import { useTrade } from '../../contexts/TradeContext'
import styles from './AddTrade.module.css'; 
import OptionAction from './OptionAction.jsx';
import OptionItems from '../Input/OptionItems.jsx';
import { defaultStock } from '../../../public/tradeDefaults.js'
import Button from '../Button/Button.jsx'

function AddStock({ strategy,
  handleChange,
  items,
  itemSubAction,
  stockVisible,
  setStockVisible,
}) {
  const { newTrade, setNewTrade } = useTrade();

  const stockTrade = newTrade.trades.find(t => t.trade_type === 'STOCK') || {};
  
  if (!stockVisible || !stockTrade) return null;

  const stockValue = stockTrade.price && stockTrade.qty 
  ? (stockTrade.price * stockTrade.qty).toFixed(2)
  : '';

  const deleteStock = () => {
    setNewTrade(prev => ({
      ...prev,
      trades: prev.trades.filter(trade => trade.trade_type !== 'STOCK')
    }));
    setStockVisible(0);
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setNewTrade(prev => ({
      ...prev,
      trades: prev.trades.map(trade => 
        trade.trade_type === 'STOCK'
          ? { ...trade, [name]: value }
          : trade
      )
    }));
  };

  return (
    <>
      <div className={styles.addOption}>
        <span>Stock:&nbsp;&nbsp;&nbsp;</span>
        {/* <Button handleClick={deleteStock} className={styles.buttonRemove} /> */}
        <OptionAction option={stockTrade}
            items={items}
            handleChange={handleStockChange} />
        <label>Open/Close: 
          <select 
              className="inputSelect"
              name="sub_action"
              value={stockTrade.sub_action || ""}
              onChange={handleStockChange}>
              <OptionItems items={itemSubAction}/>
          </select>
        </label>
        <label>Price: 
            <input 
            type="number" 
            name="price" 
            value={stockTrade.price || ""} 
            onChange={handleStockChange}
            placeholder="100"
            />
        </label>
        <label>Value: 
            <input 
            type="number" 
            name="value" 
            value={stockTrade.value || ""} 
            onChange={handleStockChange}
            placeholder="10,000"
            readOnly/>
        </label>
        <label>Quantity: 
            <input 
            type="number" 
            name="qty" 
            value={stockTrade.qty || ""} 
            onChange={handleStockChange}
            placeholder="1"
            />
        </label>

      </div>
    </>
  );
}

export default AddStock



