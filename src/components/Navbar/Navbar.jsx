import { useState } from 'react'
import styles from './Navbar.module.css'; 
import Button from '../Button.jsx'

function Navbar() {
  return (
    <>
        <nav>
            <Button text="Positions"/>
        </nav>
    </>
  )
}

export default Navbar
