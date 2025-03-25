import { useState, useEffect } from 'react'
import './App.css'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import TopNavbar from './components/Navbar/TopNavbar.jsx'
import TradesTable from './components/TradesTable/TradesTable.jsx'
import { Outlet } from "react-router-dom";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     const authenticated = await checkAuth();
  //     setIsAuthenticated(authenticated);
  //   };
  //   verifyAuth();
  // }, []);

  return (
    <>
      {/* {!isAuthenticated && <TopNavbar />} */}
      <main id="pageContainer">
        <Outlet />
      </main>
      {/* <div id="mainContainer">
        <main>
          <div>
            {JSON.stringify(newTrade)}
          </div>
          <AddTradeForm  />
          <AddTradeModal trades={trades} setTrades={setTrades} setNewTrade={setNewTrade}/>
          <ImportCsvModal />
          <TradesTable />
        </main>
      </div> */}
    </>
  )
}

export default App
