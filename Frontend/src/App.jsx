import { useState, useEffect } from 'react'
import './App.css'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import TopNavbar from './components/Navbar/TopNavbar.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <TopNavbar />
      <div id="mainContainer">
        <main>
          <Outlet />
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
