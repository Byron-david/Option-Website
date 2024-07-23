import { useState } from 'react'
import OptionItems from '../Input/OptionItems.jsx'
import Button from '../Button/Button.jsx'
import { v4 as uuid } from 'uuid';
import AddLeg from './AddLeg.jsx'
import tradeService from '../../services/trades.js'
import AddStock from './AddStock.jsx';

const tableHeader = [
  "Symbol", 
  "Date",
  "Action",
  "Strategy",
  "Qty",
  "Price",
  "Strikes",
  "Value",
  "Exp. Date",
  "Edit"
]

const defaultTrade = { symbol: '', 
                      date: '' 
                    }

const defaultStock = {
  action: 'BUY', 
  subAction: 'OPEN', 
  strategy: 'STOCK', 
  qty: '', 
  price: '', 
  value: '', 
  expDate: null, 
}

const defaultLeg = { 
                action: 'BUY',
                subAction: 'OPEN', 
                strategy: 'CALL', 
                qty: '', 
                strikes: '', 
                value: '', 
                expDate: '', 
              }

function AddTradeForm({ trades, setTrades, handleClickClose }) {
  const [newTrade, setNewTrade] = useState(defaultTrade)
  const [stock, setStock] = useState(defaultStock)
  const [leg, setLeg] = useState([])
  const [strategy, setStrategy] = useState("Stock");

  const strategyOptions = [
    { id: uuid(), value: "Stock", text: "Stock", quantity: 0 },
    { id: uuid(), value: "Option", text: "Single Option", quantity: 1 },
    { id: uuid(), value: "Covered Call", text: "Covered Call", quantity: 1 },
    { id: uuid(), value: "Vertical Spread", text: "Vertical Spread", quantity: 2 },
    { id: uuid(), value: "Strangle", text: "Strangle", quantity: 2 },
    { id: uuid(), value: "Iron Condor", text: "Iron Condor", quantity: 4 },
    { id: uuid(), value: "Butterfly", text: "Butterfly", quantity: 4 },
    // { id: uuid(), value: "ratioSpread", text: "Ratio Spread", quantity: 3 },
    // { id: uuid(), value: "custom", text: "Custom", quantity: 0 }
  ]

  const action = [
    { id: uuid(), value: "BUY", text: "Buy" },
    { id: uuid(), value: "SELL", text: "Sell" },
  ]

  const subAction = [
    { id: uuid(), value: "OPEN", text: "Open" },
    { id: uuid(), value: "CLOSE", text: "Close" },
  ]

  const posType = [
    { id: uuid(), value: "PUT", text: "Put" },
    { id: uuid(), value: "CALL", text: "Call" },
  ]

  const handleTrade = (event) => {
    setNewTrade(values => ({...values, [event.target.name]: event.target.value.toUpperCase()}))
  }

  const handleStock = (event) => {
    setStock(values => ({...values, [event.target.name]: event.target.value}))
  }

  const handleStrategy = (event) => {
    const newStrategy = event.target.value
    setStrategy(newStrategy)

    const findQty = strategyOptions.find(element => element.value === newStrategy)

    setLeg([])
    setStock(defaultStock)
    for (let i = 0; i < findQty.quantity; i++ ) {
      const newLeg = { ...defaultLeg }

      if (i > 0 && i < 3) {
        newLeg.action = "SELL"
      }

      if (newStrategy === "Iron Condor") {
        if (i < 2) {
          newLeg.posType = "PUT"
        }
      }

      if (newStrategy === "Covered Call") {
        newLeg.action = "SELL"
      }

      if (newStrategy === "Strangle" ) {
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

  const valueAdjust = (combinedTrade, value) => {
    combinedTrade.map(t => t.action === "BUY" ? t[value] = `${t[value] * -1}` : t[value] )
  }

  const addTrade = event => {
    event.preventDefault()
    let combinedTrade = []
    
    if (leg.length !== 0 && stock.price !== '') {
      const newStock = {...newTrade, ...stock}
      const newLeg = leg.map(prev => ({...newTrade, ...prev}))
      combinedTrade = combinedTrade.concat(newStock, ...newLeg)
    }
    else if (leg.length !== 0) {
      combinedTrade = leg.map(prev => ({...newTrade, ...prev}))
    }
    else {
      combinedTrade = [{...newTrade, ...stock}]
    }
  
    valueAdjust(combinedTrade, "value")
    valueAdjust(combinedTrade, "price")
    const tradeObject = {[strategy]: combinedTrade}

    tradeService
      .create(tradeObject)
      .then(returnedTrade => {
        setTrades(trades.concat(returnedTrade))
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
                    value={newTrade.symbol || ""} 
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
                    value={newTrade.date || ""} 
                    onChange={handleTrade}
                  />
                </label>
            </div>
            <AddStock strategy={strategy} items={action} handleChange={handleStock} stock={stock} itemSubAction={subAction} />
            <AddLeg leg={leg} setLeg={setLeg} strategy={strategy} itemTypes={posType} itemActions={action} newLeg={defaultLeg} itemSubAction={subAction} />
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
