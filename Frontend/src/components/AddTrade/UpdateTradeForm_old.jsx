import { useState } from 'react'
import OptionItems from '../Input/OptionItems.jsx'
import Button from '../Button/Button.jsx'
import { v4 as uuid } from 'uuid';
import AddLeg from './AddLeg.jsx'
import tradeService from '../../services/trades.js'
import AddStock from './AddStock.jsx';

const defaultTrade = { symbol: '', 
                       date: ''
                    }

const defaultStock = {
  action: 'BUY', 
  sub_action: 'OPEN', 
  trade_type: 'STOCK', 
  qty: '', 
  price: '', 
  value: '', 
  exp: null, 
}

const defaultLeg = { 
                action: 'BUY',
                sub_action: 'OPEN', 
                trade_type: 'CALL', 
                qty: 1, 
                strikes: '', 
                value: '', 
                exp: '', 
              }

function UpdateTradeForm({ allTrades, setAllTrades, handleClickClose, header }) {
  const [newTrade, setNewTrade] = useState(defaultTrade)
  const [stock, setStock] = useState({...defaultStock})
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
    const updateStrategy = event.target.value
    setStrategy(updateStrategy)

    const findQty = strategyOptions.find(element => element.value === updateStrategy)

    if (updateStrategy === "Stock" || updateStrategy === "Covered Call") {
      setStock({...defaultStock})
    }
    else {
      setStock({})
    }

    setLeg([])
    for (let i = 0; i < findQty.quantity; i++ ) {
      const newLeg = { ...defaultLeg }

      if (i > 0 && i < 3) {
        newLeg.action = "SELL"
      }

      if (updateStrategy === "Iron Condor") {
        if (i < 2) {
          newLeg.trade_type = "PUT"
        }
      }

      if (updateStrategy === "Covered Call") {
        newLeg.action = "SELL"
      }

      if (updateStrategy === "Strangle" ) {
        newLeg.action = "SELL"
        if (i < 1) {
          newLeg.trade_type = "PUT"
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
    
    if (leg.length !== 0 && Object.keys(stock).length !== 0) {
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
        setAllTrades(allTrades.concat(returnedTrade))
        setNewTrade(defaultTrade)
      })
      // handleClickClose()
  }

  return (
    <>
      <div className="containerTemplate">
        <div className="titleTemplate">Add Trade</div>
        <form action ="/dashboard/trades" onSubmit={addTrade} method="POST">
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
                    name="date" 
                    value={newTrade.date || ""} 
                    onChange={handleTrade}
                  />
                </label>
            </div>
            <AddStock strategy={strategy} items={action} handleChange={handleStock} stock={stock} itemSubAction={subAction} />
            <AddLeg leg={leg} setLeg={setLeg} strategy={strategy} itemTypes={posType} itemActions={action} newLeg={defaultLeg} itemSubAction={subAction} />
          </div>
          <div className="footerTemplate">
            <Button text="Cancel" backgroundColor="var(--color-button-red)" handleClick={handleClickClose} />
            <Button type="submit" text="Save" className="buttonAdd" />
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateTradeForm
