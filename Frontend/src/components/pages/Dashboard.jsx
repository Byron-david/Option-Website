import Navbar from '../Navbar/Navbar';
import styles from './Pages.module.css'; 
import { Link, Outlet } from "react-router-dom"

function dashboard() {
  return (
    <>
      <Navbar />
      <main className={styles.dashboard}>
        <Outlet />
      </main>
    </>
  )
}

export default dashboard
