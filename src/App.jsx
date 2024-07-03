import { useState, useEffect } from 'react'
import './App.css'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'
import ImportCsvModal from './components/ImportCsvModal.jsx'
import Button from './components/Button/Button.jsx'
import AddOption from './components/AddTrade/AddOption.jsx'
import DropdownOptions from './components/Input/DropdownOptions.jsx'
import { v4 as uuid } from 'uuid';

const dropdownOptions = [
  { id: uuid(), value: "ironCondor", text: "Iron Condor" },
  { id: uuid(), value: "stock", text: "Stock" },
  { id: uuid(), value: "strangle", text: "Strangle" }
]

function App() {
  const [newTrade, setNewTrade] = useState({ 
    symbol: '', 
    strike: '', 
    price: '', 
    expDate: '', 
    quantity: '', 
    dateExec: '' },
  )

  const [optionLegs, setOptionLegs] = useState([{
    strike: '', 
    optionValue: '', 
    expDate: '', 
    quantity: '', 
  }]
  )
  const [strategy, setStrategy] = useState("");

  const handleLegChange = (index, event) => {
    let data = [...optionLegs];
    data[index][event.target.name] = event.target.value;
    setOptionLegs(data);
  }

  const handleTrade = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewTrade(values => ({...values, [name]: value}))
  }

  const handleStrategy = (event) => {
    setStrategy(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // const objectString = JSON.stringify(newTrade);
    // alert(`${objectString}`);
  }

  const addLeg = () => {
    let newLeg = {
                    strike: '', 
                    optionValue: '', 
                    expDate: '', 
                    quantity: '', 
                  }

    setOptionLegs([...optionLegs, newLeg])
  }

  const deleteLeg = (index) => {
    let data = [...optionLegs];
    data.splice(index, 1)
    setOptionLegs(data)
  }

  const handleButtonClickAdd = () => {
    // const newOption = [ ...addOption,
    //   { id: nextId++,
    //     strikePrice: "strikePrice" + nextId, 
    //     optionValue: "optionValue" + nextId, 
    //     quantity: "quantity" + nextId, 
    //     exp: "exp" + nextId }
    // ];
    
    // // Prevents more than 3 additional legs
    // if (addOption.length < 3) {
    //   setAddOption(newOption);
    // }
  };

  return (
    <>
      <Navbar />
      <div id="mainContainer">
        <main>
          <div>
            {strategy} {JSON.stringify(newTrade)}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formContainer">
                <label>Symbol: 
                  <input 
                    type="text" 
                    name="symbol" 
                    value={newTrade.symbol || ""} 
                    onChange={handleTrade}
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
                <label>Strike Price: 
                  <input 
                    type="number" 
                    name="strike" 
                    value={newTrade.strike || ""} 
                    onChange={handleTrade}
                  />
                </label>
                <label>Strike Price: 
                  <input 
                    type="number" 
                    name="price" 
                    value={newTrade.price || ""} 
                    onChange={handleTrade}
                  />
                </label>
                <label>Expiration:
                  <input 
                    type="date" 
                    name="expDate" 
                    value={newTrade.expDate || ""} 
                    onChange={handleTrade}
                  />
                </label>
                <label>Quantity: 
                  <input 
                    type="number" 
                    name="quantity" 
                    value={newTrade.quantity || ""} 
                    onChange={handleTrade}
                  />
                </label>
                <label>Date Exec.:
                  <input 
                    type="date" 
                    name="dateExec" 
                    value={newTrade.dateExec || ""} 
                    onChange={handleTrade}
                  />
                </label>
            </div>
            <div>
            {optionLegs.map((option, index) => (
              <AddOption key={index} inputs={option} handleChange={e => handleLegChange(index, e)} 
              handleClick={() => deleteLeg(index)}/>
              ))}
            <Button type="button" text="+ Add Option" className="buttonAdd" handleClick={addLeg} />
            </div>

            {/* <button type="submit">Submit</button> */}
          </form>
          {/* <AddTradeModal addTrade={addTrade} handleChange={handleChange} newTrade={newTrade}/> */}
          {/* <ImportCsvModal />
          <PositionsTable data={trades}/> */}
        </main>
      </div>
    </>
  )
}

export default App
