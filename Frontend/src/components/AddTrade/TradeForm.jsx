import { useState } from 'react'
import OptionItems from '../Input/OptionItems.jsx'
import Button from '../Button/Button.jsx'
import AddLeg from './AddLeg.jsx'
import AddStock from './AddStock.jsx';
import { 
  defaultNewTrade, 
  defaultTrade, 
  defaultStock, 
  defaultLeg, 
  strategyOptions, 
  action, 
  subAction, 
  posType } from '../../../public/tradeDefaults.js'

function TradeForm({ handleClickClose, onSubmit, newTrade, setNewTrade }) {
  const [strategy, setStrategy] = useState("Stock");

  const handleTrade = (event) => {
    console.log(event.target.name, event.target.value);
    setNewTrade(values => ({
      ...values, 
      base: {...values.base, [event.target.name]: event.target.value.toUpperCase()}
      // base: { [event.target.name]: event.target.value.toUpperCase()}
    }))
  }

  const handleStock = (event) => {
    setNewTrade(values => ({
      ...values, 
      stock: {...values.stock, [event.target.name]: event.target.value }}))
      console.log(newTrade);
  }

  const handleStrategy = (event) => {
    const updateStrategy = event.target.value
    setStrategy(updateStrategy)

    const findQty = strategyOptions.find(element => element.value === updateStrategy)

    if (updateStrategy === "Stock" || updateStrategy === "Covered Call") {
      setNewTrade(values => ({
        ...values, 
        stock: {...defaultStock}}))
    }
    else {
      setNewTrade(values => ({
        ...values, 
        stock: {}
      }))
    }

    setNewTrade(values => ({
      ...values, 
      legs: []
    }))

    let allLegs = []
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

      allLegs.push(newLeg)
      // setNewTrade(values => ({
      //   ...values, 
      //   legs: [leg => [...leg, newLeg]]
      // }))
      // setNewTrade([...newTrade.legs, newLeg])
      
      // setNewTrade((prev) => {
      //   const newState = [...prev, newLeg]
      //   return newState
      // })
    }
    setNewTrade(values => ({
      ...values, 
      legs: allLegs
    }))
  }

  const valueAdjust = (combinedTrade, value) => {
    combinedTrade.map(t => t.action === "BUY" ? t[value] = `${t[value] * -1}` : t[value] )
  }

  const addTrade = event => {
    event.preventDefault()
    let combinedTrade = []
    
    if (newTrade.legs.length !== 0 && Object.keys(newTrade.stock).length !== 0) {
      const newStock = {...newTrade.base, ...newTrade.stock}
      const newLeg = newTrade.legs.map(prev => ({...newTrade.base, ...prev}))
      combinedTrade = combinedTrade.concat(newStock, ...newLeg)
    }
    else if (newTrade.legs.length !== 0) {
      combinedTrade = newTrade.legs.map(prev => ({...newTrade.base, ...prev}))

    }
    else {
      combinedTrade = [{...newTrade.base, ...newTrade.stock}]
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
      <form action ="/dashboard/trades" onSubmit={onSubmit} method="POST">
        <div className="bodyTemplate">
          <div className="inputContainer">
              <label>Symbol: 
                <input 
                  type="text" 
                  name="symbol" 
                  value={newTrade.base.symbol || ""} 
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
                  value={newTrade.base.date || ""} 
                  onChange={handleTrade}
                />
              </label>
          </div>
          <AddStock strategy={strategy} items={action} handleChange={handleStock} stock={newTrade.stock} itemSubAction={subAction} />
          <AddLeg leg={newTrade.legs} setNewTrade={setNewTrade} strategy={strategy} itemTypes={posType} itemActions={action} newLeg={defaultLeg} itemSubAction={subAction} />
        </div>
        <div className="footerTemplate">
          <Button text="Cancel" backgroundColor="var(--background-color-button-red)" handleClick={handleClickClose} />
          <Button type="submit" text="Save" className="buttonAdd" />
        </div>
      </form>
    </>
  );
}

export default TradeForm
