import { useState } from 'react'
import styles from './Navbar.module.css'; 

function Button({ text = "Positions", handleClick, className = styles.navButtons }) {
  // const buttonStyle = {
  //   color: color,
  //   backgroundColor: backgroundColor,
  // }
  return (
    <button className={className} onClick={handleClick}>{text}</button>
  )
}

function Logo() {
  return (
    <>
      <h2 id={styles.logo}>Option Insights</h2>
      <hr/>
    </>
  )
}

function Navbar() {
  return (
    <>
      <div id={styles.navContainer}>
        <Logo />
        <nav>
          <ul>
            <li><Button text="Positions" className={`${styles.navButtons} ${styles.active}`} /></li>
            <li><Button text="Statistics"/></li>
            <li><Button text="Pricing"/></li>
            <li><Button text="Support"/></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar
