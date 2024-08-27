import { useState } from 'react'
import styles from './Button.module.css'; 

function Button({ text = "x", handleClick, 
                  className = styles.buttonGreen, 
                  backgroundColor,
                  color = "white"
                }) 
  {
  const buttonStyle = {
    backgroundColor: backgroundColor,
    color: color
  }

  return (
    <button style={buttonStyle} className={className} onClick={handleClick}>{text}</button>
  )
}

export default Button
