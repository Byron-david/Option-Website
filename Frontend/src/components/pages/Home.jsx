import { useState } from 'react'
import styles from './Pages.module.css'; 

function Home() {
  return (
    <>
      <h1 id={styles.homeH1}>Stock and Option Spread Tracking</h1>
      <h2 class={styles.homeP}>Track all of your complex spreads simply</h2>
    </>
  )
}

export default Home
