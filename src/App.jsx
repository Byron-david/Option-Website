import { useState, useEffect } from 'react'
import './App.css'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'
import { v4 as uuid } from 'uuid';
import axios from 'axios'

const dropdownOptions = [
  { id: uuid(), value: "ironCondor", text: "Iron Condor" },
  { id: uuid(), value: "stock", text: "Stock" },
  { id: uuid(), value: "strangle", text: "Strangle" }
]

function App() {
  const [newTrade, setNewTrade] = useState([])
  const [trades, setTrades] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/trades')
      .then(response => {
        setTrades(response.data)
      })
  }, [])

  return (
    <>
      <Navbar />
      <div id="mainContainer">
        <main>
          <div>
            {JSON.stringify(newTrade)}
          </div>
          {/* <AddTradeForm  /> */}
          <AddTradeModal trades={trades} setTrades={setTrades} setNewTrade={setNewTrade}/>
          {/* <ImportCsvModal />
          <PositionsTable data={trades}/> */}
        </main>
      </div>
    </>
  )
}

export default App
