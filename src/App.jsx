import { useState } from 'react'
import './App.css'
import AddTrade from './components/AddTrade.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
// import ImportCSV from './components/ImportCSV.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'

function App() {

  return (
    <>
      {/* <AddTrade /> */}
      <Navbar />
      <main>
        <PositionsTable />
      </main>
      {/* <ImportCSV /> */}
      {/* <CsvFileInput /> */}
    </>
  )
}

export default App
