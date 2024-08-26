import { useState } from 'react'
import OptionItems from '../Input/OptionItems.jsx'
import Button from '../Button/Button.jsx'
import AddLeg from './AddLeg.jsx'
import AddStock from './AddStock.jsx';
import styles from './AddTrade.module.css'; 
import { 
  defaultStock, 
  defaultLeg, 
  strategyOptions, 
  action, 
  subAction, 
  posType } from '../../../public/tradeDefaults.js'

function TradeForm({ handleClickClose, onSubmit, newTrade, setNewTrade }) {
  const [preset, setPreset] = useState("Stock");
  const [stockVisible, setStockVisible] = useState(1);

  const handleTrade = (event) => {
    setNewTrade(values => ({
      ...values, 
      base: {...values.base, [event.target.name]: event.target.value.toUpperCase()}
    }))
  }

  const handleStock = (event) => {
    setNewTrade(values => (
      { ...values, 
      stock: {...values.stock, [event.target.name]: event.target.value }}
    ))
  }

  const handlePreset = (event) => {
    const updateStrategy = event.target.value
    setPreset(updateStrategy)

    const findQty = strategyOptions.find(element => element.value === updateStrategy)

    if (updateStrategy === "Stock" || updateStrategy === "Covered Call") {
      setNewTrade(values => ({
        ...values, 
        stock: {...defaultStock}}))
      setStockVisible(1)
    }
    else {
      setNewTrade(values => ({
        ...values, 
        stock: {}
      }))
      setStockVisible(0)
    }

    setNewTrade(values => (
      { ...values, 
      legs: [] }
    ))

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
    }
    setNewTrade(values => (
      { ...values, 
      legs: allLegs }
    ))
  }

  const addNewLeg = () => {
    const newLeg = { ...defaultLeg }
    const leg = newTrade.legs

    // 3 legs max
    if (leg.length <= 3) {
      setNewTrade(values => ({
        ...values, 
        legs: [...values.legs, newLeg] 
      }))
      console.log(newTrade);

    }
  }

  const addStock = () => {
    setNewTrade(values => (
      { ...values, 
      stock: {...defaultStock} }
    ))
    setStockVisible(1);
  }

  let addStockButton
  let showStock
  if (stockVisible === 0) {
    showStock = null
    addStockButton = <Button handleClick={addStock}
                      className={styles.buttonAdd}
                      text="Add Stock" />
  } else {
    showStock = <AddStock strategy={strategy}
                  items={action}
                  handleChange={handleStock}
                  stock={newTrade.stock}
                  itemSubAction={subAction}
                  stockVisible={stockVisible}
                  setStockVisible={setStockVisible}
                  setNewTrade={setNewTrade} />

      addStockButton = null
  }


  // {stockVisible === 0 ? null 
  //   : <AddStock strategy={preset}
  //               items={action}
  //               handleChange={handleStock}
  //               stock={newTrade.stock}
  //               itemSubAction={subAction}
  //               stockVisible={stockVisible}
  //               setStockVisible={setStockVisible}
  //               setNewTrade={setNewTrade} />}
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
              <label>Preset:
                <select 
                    className="inputSelect"
                    name="preset"
                    value={preset}
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

          <AddStock strategy={preset}
                    items={action}
                    handleChange={handleStock}
                    stock={newTrade.stock}
                    itemSubAction={subAction}
                    stockVisible={stockVisible}
                    setStockVisible={setStockVisible}
                    setNewTrade={setNewTrade} />
          <AddLeg newTrade={newTrade} setNewTrade={setNewTrade} strategy={preset} itemTypes={posType} itemActions={action} itemSubAction={subAction} />
          <div>
            <Button handleClick={addStock}
                      className={styles.buttonAdd}
                      text="Add Stock" />
            <Button handleClick={addNewLeg}
                      className={styles.buttonAdd}
                      text="Add Option" />
          </div>
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
