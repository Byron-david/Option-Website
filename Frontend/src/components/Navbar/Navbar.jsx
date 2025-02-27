import { useState } from 'react'
import styles from './Navbar.module.css'; 
import AddTradeModal from '../AddTrade/AddTradeModal.jsx'
import ImportCsvModal from '../ImportCsvModal.jsx'
import { Outlet } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";


function Logo() {
  return (
    <>
      <h2 id={styles.logo}>Option Insights</h2>
      <hr className={styles.logoHr}/>
    </>
  )
}

function Navbar() {
  const [activeButton, setActiveButton] = useState(null);

  // Get the current route location
  const location = useLocation();

  return (
    <>
      <div id={styles.navContainer}>
        <Logo />
        <nav className={styles.sideNavElements}>
          <ul>
            <li>
              {/* Check location, then set active */}
              <Link to="/dashboard/trades"
                    className={location.pathname === "/dashboard/trades" ?
                    `${styles.navButtons} ${styles.active}` : styles.navButtons}
                    >
                    Trades
              </Link>
            </li>
            <li>
              <Link to="/dashboard"
                    className={location.pathname === "/dashboard" ?
                      `${styles.navButtons} ${styles.active}` : styles.navButtons}
                    >
                    Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        {/* <AddTradeModal /> */}
        {/* <ImportCsvModal /> */}
      </div>
    </>
  )
}

export default Navbar
