import { useState } from 'react'
import styles from './Navbar.module.css'; 
import Button from '../Button/Button.jsx'

// function Button({ text = "Positions", handleClick, className = styles.navButtons }) {
//   // const buttonStyle = {
//   //   color: color,
//   //   backgroundColor: backgroundColor,
//   // }
//   return (
//     <button className={className} onClick={handleClick}>{text}</button>
//   )
// }

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
      <div>
        <nav id={styles.topNavContainer}>
          <div>
            <a id={styles.topNavTitle}>Option Insight</a>
          </div>
          <div id={styles.topNavElements}>
            <a>Pricing</a>
            <a>Sign In</a>
          </div>
        </nav>
      </div>
    </>
  )
}

export default TopNavbar
