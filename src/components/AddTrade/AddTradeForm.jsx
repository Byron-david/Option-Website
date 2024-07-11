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
  posType: 'STOCK', 
  quantity: '', 
  tradeValue: '', 
  price: '', 
}

const defaultLeg = { 
                action: 'BUY',
                posType: 'CALL', 
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
    { id: uuid(), value: "ironCondor", text: "Iron Condor", quantity: 4 },
    { id: uuid(), value: "butterfly", text: "Butterfly", quantity: 4 },
    // { id: uuid(), value: "ratioSpread", text: "Ratio Spread", quantity: 3 },
    // { id: uuid(), value: "custom", text: "Custom", quantity: 0 }
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
    setTrade(values => ({...values, [event.target.name]: event.target.value.toUpperCase()}))
  }

  const handleStock = (event) => {
    setStock(values => ({...values, [event.target.name]: event.target.value.toUpperCase()}))
  }

  const handleStrategy = (event) => {
    const newStrategy = event.target.value
    setStrategy(newStrategy)

    const findQty = strategyOptions.find(element => element.value === newStrategy)

    setLeg([])
    for (let i = 0; i < findQty.quantity; i++ ) {
      const newLeg = { ...defaultLeg }

      if (i > 0 && i < 3) {
        newLeg.action = "SELL"
      }

      if (newStrategy === "ironCondor") {
        if (i < 2) {
          newLeg.posType = "PUT"
        }
      }

      if (newStrategy === "coveredCall") {
        newLeg.action = "SELL"
      }

      if (newStrategy === "strangle" ) {
        newLeg.action = "SELL"
        if (i < 1) {
          newLeg.posType = "PUT"
        }
      }

      setLeg((prev) => {
        const newState = [...prev, newLeg]
        return newState
      })
    }
  }

  const addTrade = event => {
    event.preventDefault()
    let newTrade
    const stockKeys = Object.keys(stock)

    if (leg.length !== 0 && stockKeys.length !== 0) {
      newTrade = [trade, {...stock},...leg]
    }
    else if (leg.length !== 0) {
      newTrade = [trade, ...leg]
    }
    else {
      newTrade = {...stock}
    }
  
    const tradeObject = {[strategy]: [newTrade]}
    console.log(tradeObject);
    // axios
    //   .post('http://localhost:3001/trades', tradeObject)
    //   .then(response => {
    //     setTrades(trades.concat(response.data))
    //     setNewTrade(defaultTrade)
    //   })
    //   handleClickClose()
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
            <AddStock strategy={strategy} items={action} handleChange={handleStock} stock={stock} />
            <AddLeg leg={leg} setLeg={setLeg} strategy={strategy} itemTypes={posType} itemActions={action} newLeg={defaultLeg} />
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
