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
    if (!isLoading && !isAuthenticated) {
       navigate('/'); 
    }
    if (isAuthenticated) {
          navigate('/dashboard');
        }
  }, [isLoading, isAuthenticated, location, navigate]);

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
