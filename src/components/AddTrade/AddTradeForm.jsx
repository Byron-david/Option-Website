import { useState } from 'react'
import OptionItems from '../Input/OptionItems.jsx'
import Button from '../Button/Button.jsx'
import AddOption from './AddOption.jsx'
import { v4 as uuid } from 'uuid';
import AddLeg from './AddLeg.jsx'

function AddTradeForm({ setNewTrade, handleClickClose }) {
  const [trade, setTrade] = useState({ 
    symbol: '', 
    strike: '', 
    posType: '', 
    tradeValue: '', 
    expDate: '', 
    quantity: '', 
    dateExec: '' },
  )

  const [leg, setLeg] = useState([])
  const [strategy, setStrategy] = useState("stock");

  const strategyOptions = [
    { id: uuid(), value: "stock", text: "Stock", quantity: 0 },
    { id: uuid(), value: "singleOption", text: "Single Option", quantity: 0 },
    { id: uuid(), value: "coveredCall", text: "Covered Call", quantity: 1 },
    { id: uuid(), value: "verticalSpread", text: "Vertical Spread", quantity: 1 },
    { id: uuid(), value: "strangle", text: "Strangle", quantity: 1 },
    { id: uuid(), value: "straddle", text: "Straddle", quantity: 1 },
    { id: uuid(), value: "ironCondor", text: "Iron Condor", quantity: 3 },
    { id: uuid(), value: "butterfly", text: "Butterfly", quantity: 3 },
    { id: uuid(), value: "ratioSpread", text: "Ratio Spread", quantity: 2 },
    { id: uuid(), value: "custom", text: "Custom", quantity: 0 }
  ]

  const positionType = [
    { id: uuid(), value: "BUY", text: "Buy" },
    { id: uuid(), value: "SELL", text: "Sell" },
  ]

  const submitTrade = (event) => {
    event.preventDefault()
  }

  const handleButtonSave = () => {
    console.log("Saving...");  
  }

  const handleTrade = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTrade(values => ({...values, [name]: value.toUpperCase()}))
  }

  const handleStrategy = (event) => {
    const currentStrategy = event.target.value

    setStrategy(currentStrategy)

    let newLeg = {
      strike: '', 
      posType: '', 
      tradeValue: '', 
      expDate: '', 
      quantity: '', 
    }

    const findQty = strategyOptions.find(element => element.value === currentStrategy)
    let legQuantity = Array(findQty.quantity).fill(newLeg)

    setLeg([])
    setLeg(legQuantity)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    
    let objectString;
    let newLeg = leg

    if (leg.length !== 0) {
      newLeg.unshift([trade])
      console.log(newLeg)
      objectString = JSON.stringify({[strategy]: [newLeg]})
    }
    else {
      objectString = JSON.stringify({[strategy]: [trade]})
    }

    setNewTrade(objectString)
    alert(objectString)
  }

  return (
    <>
      <div className="containerTemplate">
        <div className="titleTemplate">Add Trade</div>
        <form onSubmit={handleSubmit}>
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
                <label >Type: 
                  <select 
                      className="inputSelect"
                      name="posType"
                      value={trade.posType}
                      onChange={handleTrade}>
                      <OptionItems items={positionType}/>
                  </select>
                </label>
                <label>Value: 
                  <input 
                    type="number" 
                    name="tradeValue" 
                    value={trade.tradeValue || ""} 
                    onChange={handleTrade}
                  />
                </label>

                {(strategy !== "stock" && strategy !== "coveredCall") && <AddOption inputs={trade} handleChange={handleTrade}/>}
                
                <label>Quantity: 
                  <input 
                    type="number" 
                    name="quantity" 
                    value={trade.quantity || ""} 
                    onChange={handleTrade}
                    placeholder="1"
                  />
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
            <AddLeg leg={leg} setLeg={setLeg} strategy={strategy} items={positionType} />
          </div>
          <div className="footerTemplate">
            <Button text="Cancel" backgroundColor="var(--background-color-button-red)" handleClick={handleClickClose} />
            <Button type="submit" text="Save" className="buttonAdd" handleClick={handleClickClose} />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTradeForm
