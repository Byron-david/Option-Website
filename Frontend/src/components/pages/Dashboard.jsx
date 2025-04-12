import Navbar from '../Navbar/Navbar';
import styles from './Pages.module.css'; 
import { Link, Outlet } from "react-router-dom"
import { useEffect } from 'react'

function dashboard() {
  // const fetchTest = async (e) => {
  //   try {
  //     const response = await fetch('/api/dashboard', {
  //       credentials: 'include', // Required for session cookies
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     const data = await response.json();
  //     return data
  //   } catch (error) {
  //     console.error('Error fetching trades:', error);
  //   }
  // }

  //   useEffect(() => {
  //       const fetchDataAsync = async () => {
  //         try {
  //           const fetchedData = await fetchTest();
    
  //         } catch (err) {
  //           console.error('Error fetching trades:', err);
  //         } 
  //       };
    
  //       fetchDataAsync();
  //     }, []);
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
