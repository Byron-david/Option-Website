import { useState } from 'react'
import OptionItems from '../Input/OptionItems.jsx'
import Button from '../Button/Button.jsx'
import AddOption from './AddOption.jsx'
import { v4 as uuid } from 'uuid';
import AddLeg from './AddLeg.jsx'
import axios from 'axios'
import styles from './AddTrade.module.css'; 
import OptionAction from './OptionAction.jsx';
import AddStock from './AddStock.jsx';

const tableHeadNames = [
  "Symbol", 
  "Action", 
  "Type", 
  "Qty", 
  "Value", 
  "Strike",  
  "Exp. Date", 
  "Date",
  "Time"
];

const defaultTrade = { symbol: '', 
                      dateExec: '' 
                    }

const defaultStock = {
  action: 'BUY', 
  quantity: '', 
  tradeValue: '', 
}

const defaultLeg = { 
                action: 'BUY',
                posType: 'PUT', 
                quantity: '', 
                tradeValue: '', 
                strike: '', 
                expDate: '', 
              }

function AddTradeForm({ trades, setTrades, setNewTrade, handleClickClose }) {
  const [trade, setTrade] = useState(defaultTrade)
  const [stock, setStock] = useState(defaultStock)
  const [leg, setLeg] = useState([])
  const [strategy, setStrategy] = useState("stock");

  const strategyOptions = [
    { id: uuid(), value: "stock", text: "Stock", quantity: 0 },
    { id: uuid(), value: "singleOption", text: "Single Option", quantity: 1 },
    { id: uuid(), value: "coveredCall", text: "Covered Call", quantity: 1 },
    { id: uuid(), value: "verticalSpread", text: "Vertical Spread", quantity: 2 },
    { id: uuid(), value: "strangle", text: "Strangle", quantity: 2 },
    { id: uuid(), value: "straddle", text: "Straddle", quantity: 2 },
    { id: uuid(), value: "ironCondor", text: "Iron Condor", quantity: 4 },
    { id: uuid(), value: "butterfly", text: "Butterfly", quantity: 4 },
    { id: uuid(), value: "ratioSpread", text: "Ratio Spread", quantity: 3 },
    { id: uuid(), value: "custom", text: "Custom", quantity: 0 }
  ]

  const action = [
    { id: uuid(), value: "BUY", text: "Buy" },
    { id: uuid(), value: "SELL", text: "Sell" },
  ]

  const posType = [
    { id: uuid(), value: "PUT", text: "Put" },
    { id: uuid(), value: "CALL", text: "Call" },
  ]

  const handleTrade = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTrade(values => ({...values, [name]: value.toUpperCase()}))
  }

  const handleStock = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTrade(values => ({...values, [name]: value.toUpperCase()}))
  }

  const handleStrategy = (event) => {
    setStrategy(event.target.value)

    const findQty = strategyOptions.find(element => element.value === event.target.value)

    setLeg([])
    for (let i = 0; i < findQty.quantity; i++ ) {
      const newLeg = { ...defaultLeg }
      setLeg((prev) => {
        const newState = [...prev, newLeg]
        return newState
      })
    }
  }

  const addTrade = event => {
    event.preventDefault()
    let newTrade

    if (leg.length !== 0) {
      newTrade = [trade, ...leg]
      newTrade.unshift(trade)
    }
    else {
      newTrade = [...trade]
    }
  
    const tradeObject = {[strategy]: [newTrade]}

    axios
      .post('http://localhost:3001/trades', tradeObject)
      .then(response => {
        setTrades(trades.concat(response.data))
        setNewTrade(defaultTrade)
      })
      handleClickClose()
  }

  return (
    <>
      <div className="containerTemplate">
        <div className="titleTemplate">Add Trade</div>
        <form onSubmit={addTrade}>
          <div className="bodyTemplate">
            <div className="inputContainer">
                <label>Symbol: 
                  <input 
                    type="text" 
                    name="symbol" 
                    value={trade.symbol || ""} 
                    onChange={handleTrade}
                    placeholder="AAPL"
                    maxLength="4"
                  />
                </label>
                <label>Strategy:
                  <select 
                      className="inputSelect"
                      name="strategy"
                      value={strategy}
                      onChange={handleStrategy}> 
                      <OptionItems items={strategyOptions}/>
                  </select>
                </label>
                <label>Date Exec.:
                  <input 
                    type="date" 
                    name="dateExec" 
                    value={trade.dateExec || ""} 
                    onChange={handleTrade}
                  />
                </label>

            </div>
            <AddStock strategy={strategy} items={action} handleChange={handleStock} trade={stock} />
            <AddLeg leg={leg} setLeg={setLeg} strategy={strategy} itemTypes={posType} itemActions={action}  />
          </div>
          <div className="footerTemplate">
            <Button text="Cancel" backgroundColor="var(--background-color-button-red)" handleClick={handleClickClose} />
            <Button type="submit" text="Save" className="buttonAdd" />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTradeForm
