import Navbar from '../Navbar/Navbar';
import styles from './Pages.module.css'; 
import { Link, Outlet } from "react-router-dom"

function dashboard() {
  return (
    <>
      <div>
        <Navbar />
        <main className={styles.dashboard}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default dashboard
