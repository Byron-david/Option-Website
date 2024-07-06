import { useState } from 'react'
import DropdownOptions from '../Input/DropdownOptions.jsx'
import Button from '../Button/Button.jsx'
import AddLeg from './AddLeg.jsx'
import AddOption from './AddOption.jsx'
import { v4 as uuid } from 'uuid';
import AddLegCustom from './AddLegCustom.jsx'

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

  const dropdownOptions = [
    { id: uuid(), value: "stock", text: "Stock" },
    { id: uuid(), value: "singleOption", text: "Single Option" },
    { id: uuid(), value: "coveredCall", text: "Covered Call" },
    { id: uuid(), value: "verticalSpread", text: "Vertical Spread" },
    { id: uuid(), value: "strangle", text: "Strangle" },
    { id: uuid(), value: "straddle", text: "Straddle" },
    { id: uuid(), value: "ironCondor", text: "Iron Condor" },
    { id: uuid(), value: "butterfly", text: "Butterfly" },
    { id: uuid(), value: "ratioSpread", text: "Ratio Spread" },
    { id: uuid(), value: "custom", text: "Custom" }
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

  const handleLegChange = (index, event) => {
    let data = [...leg];
    data[index][event.target.name] = event.target.value;
    setLeg(data);
  }

  const handleTrade = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTrade(values => ({...values, [name]: value}))
  }

  const handleStrategy = (event) => {
    setStrategy(event.target.value)
  }

  const strategyDisplay = () => {
    let newLeg = {
      strike: '', 
      tradeValue: '', 
      expDate: '', 
      quantity: '', 
    }

    switch(strategy) {
      case "stock":
        return setLeg([])
      case "singleOption":
        return setLeg([...leg, newLeg])
      case "ironCondor":
        return setLeg([...leg, newLeg * 3])
      default:
        return setLeg([])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // const objectString = JSON.stringify(trade);
    // alert(`${objectString}`);
  }

  const addLeg = () => {
    let newLeg = {
                    strike: '', 
                    tradeValue: '', 
                    expDate: '', 
                    quantity: '', 
                  }

    // 3 legs max
    if (leg.length <= 2) setLeg([...leg, newLeg])
  }

  const deleteLeg = (index) => {
    let data = [...leg];
    data.splice(index, 1)
    setLeg(data)
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
                      <DropdownOptions items={dropdownOptions}/>
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

                {strategy !== "stock" && <AddOption inputs={trade} handleChange={handleTrade}/>}
                
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
            {/* <AddLegCustom leg={leg} setLeg={setLeg} strategy={strategy}/> */}
            {/* {strategy === "custom" && 
            
            } */}
            {/* {leg.map((option, index) => (
                  <AddLeg key={index}
                            inputs={option}
                            handleChange={e => handleLegChange(index, e)} 
                            handleClick={() => deleteLeg(index)}
                            strategy={strategy}/>
            ))}

            <Button type="button"
                      text="+ Add Option"
                      className="buttonAdd"
                      handleClick={addLeg} /> */}
            {/* <button type="submit">Submit</button> */}
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
