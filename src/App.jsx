import { useState, useEffect } from 'react'
import './App.css'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'
import ImportCsvModal from './components/ImportCsvModal.jsx'

function App() {
  const [trades, setTrades] = useState([])
  const [newTrade, setNewTrade] = useState([])

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
    //   content: newNote,
    //   important: Math.random() < 0.5,
    //   id: notes.length + 1,
    }

    setTrades(trades.concat(trade))
    console.log(trades);
    // setNotes(notes.concat(noteObject))
    // setNewNote('')
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    setNewTrade(values => ({...values, [name]: value}))
  }

  return (
    <>
      <Navbar />
      <div id="mainContainer">
        <main>
          <div>
            {/* {newTrade} */}
          </div>
          <AddTradeModal addTrade={addTrade} handleChange={handleChange} newTrade={newTrade}/>
          {/* <ImportCsvModal />
          <PositionsTable data={trades}/> */}
        </main>
      </div>
    </>
  )
}

export default App
