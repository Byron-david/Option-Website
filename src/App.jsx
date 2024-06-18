import { useState } from 'react'
import './App.css'
import AddTrade from './components/AddTrade.jsx'
import AddTradeModal from './components/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
// import ImportCSV from './components/ImportCSV.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'

function App() {
  return (
    <>
      <Navbar />
      <div id="mainContainer">
        <main>
          {/* <AddTradeModal /> */}
          {/* <button onClick={() => setIsOpen(true)}>Open Modal</button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            I am Open! 
          </Modal> */}
          <PositionsTable />
          {/* <AddTrade /> */}
        </main>
      </div>
    </>
  )
}

export default App
