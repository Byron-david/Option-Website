import { useState } from 'react'
import styles from './Navbar.module.css'; 

function Button({ text = "Positions", handleClick, className = "navButtons", }) {
  // const buttonStyle = {
  //   color: color,
  //   backgroundColor: backgroundColor,
  // }
  return (
    <button className={styles.navButtons} onClick={handleClick}>{text}</button>
  )
}

function Logo() {
  return (
    <h2 id={styles.logo}>Option Insights</h2>
  )
}

function Navbar() {
  return (
    <>
      <div id={styles.navContainer}>
        <Logo />
        <nav>
          <ul>
            <li><Button text="Positions"/></li>
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
