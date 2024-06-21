import { useState } from 'react'
import './App.css'
import AddTrade from './components/AddTrade/AddTrade.jsx'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
// import ImportCSV from './components/ImportCSV.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'
import MainContent from './components/MainContent.jsx'

function App() {
  return (
    <>
      <Navbar />
      <MainContent />
    </>
  )
}

export default App
