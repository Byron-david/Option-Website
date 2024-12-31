import { useState, useEffect } from 'react'
import './App.css'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import TopNavbar from './components/Navbar/TopNavbar.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'
import { v4 as uuid } from 'uuid';

const dropdownOptions = [
  { id: uuid(), value: "ironCondor", text: "Iron Condor" },
  { id: uuid(), value: "stock", text: "Stock" },
  { id: uuid(), value: "strangle", text: "Strangle" }
]

function App() {


  return (
    <>
      {/* <Navbar /> */}
      <TopNavbar />
      <div id="mainContainer">
        <main>
          <div>
            {/* {JSON.stringify(newTrade)} */}
          </div>
          {/* <AddTradeForm  /> */}
          {/* <AddTradeModal trades={trades} setTrades={setTrades} setNewTrade={setNewTrade}/> */}
          {/* <ImportCsvModal /> */}
          <PositionsTable />
        </main>
      </div>
    </>
  )
}

export default App
