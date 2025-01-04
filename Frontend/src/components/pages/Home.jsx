import { useState } from 'react'
import styles from './Pages.module.css'; 
import { Link } from "react-router-dom"
function Home() {
  return (
    <>
      <h1 class={styles.header1}>Stock and Option Spread Tracking. <br />
      Made. Simple.</h1>
      <h2 class={styles.header2}>Track all your complex option spreads easily</h2>
      <div class={styles.linkContainer}>
        <Link to="/signin" class={styles.linkButton}>Get Started</Link>
      </div>
    </>
  )
}

export default Home
