import { useState } from 'react'
import styles from './Navbar.module.css'; 
import AddTradeModal from '../AddTrade/AddTradeModal.jsx'
import ImportCsvModal from '../ImportCsvModal.jsx'
import { Outlet } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

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
  const { logout } = useAuth();

  return (
    <>
      <div id={styles.navContainer}>
        <Logo />
        <nav className={styles.sideNavElements}>
          <ul>
            <li>
              {/* Check location, then set active */}
              <Link to="/trades"
                    className={location.pathname === "/trades" ?
                    `${styles.active} ${styles.navButtons}` : styles.navButtons}
                    >
                    Trades
              </Link>
            </li>
            {/* <li>
              <Link to="/dashboard"
                    className={location.pathname === "/dashboard" ?
                      `${styles.active} ${styles.navButtons}` : styles.navButtons}
                    >
                    Dashboard
              </Link>
            </li> */}
            <li className={styles.logout}>
                <button 
                    onClick={() => logout()} 
                    className={styles.navButtons}
                    style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        width: '100%', 
                        textAlign: 'left', 
                        cursor: 'pointer' 
                    }}
                >
                    Logout
                </button>
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
