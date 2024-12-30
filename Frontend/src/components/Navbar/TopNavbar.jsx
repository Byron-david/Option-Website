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
      <hr className={styles.logoHr}/>
    </>
  )
}

function TopNavbar() {
  return (
    <>
      <div id={styles.topNavContainer}>

      </div>
    </>
  )
}

export default TopNavbar
