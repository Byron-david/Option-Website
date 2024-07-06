import { useState } from 'react'
import DropdownOptions from '../Input/DropdownOptions.jsx'
import Button from '../Button/Button.jsx'
import AddOption from './AddOption.jsx'
import { v4 as uuid } from 'uuid';
import AddLeg from './AddLeg.jsx'

function AddTradeForm({ setNewTrade, handleClickClose }) {
  const [trade, setTrade] = useState({ 
    symbol: '', 
    strike: '', 
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

  // const addTrade = (event) => {
  //   event.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     important: Math.random() < 0.5,
  //     id: notes.length + 1,
  //   }
  
  //   setNotes(notes.concat(noteObject))
  //   setNewNote('')
  // }

  const submitTrade = (event) => {
    event.preventDefault()
  }

  const handleButtonSave = () => {
    console.log("Saving...");  
  }

  const handleTrade = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTrade(values => ({...values, [name]: value}))
  }

  const handleStrategy = (event) => {
    const currentStrategy = event.target.value

    setStrategy(event.target.value)

    let newLeg = {
      strike: '', 
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
    // const objectString = JSON.stringify(trade);
    // alert(`${objectString}`);
  }

  return (
    <>
      <div className="containerTemplate">
        <form onSubmit={submitTrade}>
        <div className="titleTemplate">Add Trade</div>
          <div className="bodyTemplate">
            <div className="formContainer">
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
                      <DropdownOptions items={strategyOptions}/>
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

                {strategy !== "stock" || strategy !== "coveredCall" && <AddOption inputs={trade} handleChange={handleTrade}/>}
                
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
            <AddLeg leg={leg} setLeg={setLeg} strategy={strategy} />
          </div>
          <div className="footerTemplate">
            <Button text="Cancel" backgroundColor="var(--background-color-button-red)" handleClick={handleClickClose} />
            <Button type="submit" text="Save" className="buttonAdd" handleClick={handleButtonSave} />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTradeForm
