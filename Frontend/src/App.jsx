import { useState, useEffect } from 'react'
import './App.css'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import TopNavbar from './components/Navbar/TopNavbar.jsx'
import TradesTable from './components/TradesTable/TradesTable.jsx'
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, isLoading } = useAuth(); // 3. Get isLoading too
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated === false && location.pathname.startsWith('/trades')) {
       console.log("Redirecting to Home...");
       navigate('/'); 
    }

    if (isAuthenticated === true && location.pathname === '/') {
       console.log("Redirecting to trades...");
       navigate('/trades');
    }
    }, [isLoading, isAuthenticated, location.pathname, navigate]);

    if (isLoading) {
        return <div style={{color: 'white', padding: '20px'}}>Loading...</div>;
    }

  return (
    <>

      {!isAuthenticated && <TopNavbar />}
      {isAuthenticated && <Navbar />}
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
