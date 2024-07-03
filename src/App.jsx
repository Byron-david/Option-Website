import { useState, useEffect } from 'react'
import './App.css'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'
import ImportCsvModal from './components/ImportCsvModal.jsx'
import DropdownOptions from './components/Input/DropdownOptions.jsx'
import { v4 as uuid } from 'uuid';

const dropdownOptions = [
  { id: uuid(), value: "ironCondor", text: "Iron Condor" },
  { id: uuid(), value: "strangle", text: "Strangle" }
]

function App() {
  const [trades, setTrades] = useState([])
  const [newTrade, setNewTrade] = useState([])

  const [inputs, setInputs] = useState({});
  const [leg1, setLeg1] = useState({});
  const [leg2, setLeg2] = useState(null);
  const [leg3, setLeg3] = useState(null);
  const [leg4, setLeg4] = useState(null);
  const [strategy, setStrategy] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLeg1(values => ({...values, [name]: value}))
  }

  const handleStrategy = (event) => {
    setStrategy(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const objectString = JSON.stringify(leg1);
    alert(`${objectString}`);
  }

  const addTrade = (event) => {
    event.preventDefault()
    const trade = {
      "Symbol": "test" 
      // "Qty", 
      // "Action", 
      // "Type", 
      // "Value", 
      // "Strike",  
      // "Exp. Date", 
      // "Date",
      // "Time"
    }

    // setTrades(trades.concat(trade))
    // console.log(trades);
  }

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   console.log(name, value);
  //   setNewTrade(values => ({...values, [name]: value}))
  // }

  return (
    <>
      <Navbar />
      <div id="mainContainer">
        <main>
          <div>
            {strategy} {JSON.stringify(leg1)}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formContainer">
              <div className="inputContainer">
                <label>Symbol: 
                  <input 
                    type="text" 
                    name="symbol" 
                    value={leg1.symbol || ""} 
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="inputContainer">
                <label>Strategy:
                  <select 
                      className="inputSelect"
                      name="strategy"
                      value={strategy}
                      onChange={handleStrategy}> 
                      <DropdownOptions items={dropdownOptions}/>
                  </select>
                </label>
              </div>
              <div className="inputContainer">
                <label>Expiration:
                  <input 
                    type="date" 
                    name="expDate" 
                    value={leg1.expDate || ""} 
                    onChange={handleChange}
                  />
                </label>
              </div>          
              <div className="inputContainer">
                <label>Quantity: 
                  <input 
                    type="number" 
                    name="quantity" 
                    value={leg1.quantity || ""} 
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="inputContainer">
                <label>Date Exec.:
                  <input 
                    type="date" 
                    name="dateExec" 
                    value={leg1.dateExec || ""} 
                    onChange={handleChange}
                  />
                </label>
              </div>     
              <button type="submit">Submit</button>
            </div>

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
