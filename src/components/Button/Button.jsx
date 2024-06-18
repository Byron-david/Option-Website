import { useState } from 'react'
import styles from './Button.module.css'; 

function Button({ text = "x", handleClick, 
                  className = styles.buttonGreen, 
                  containerClassName = styles.buttonContainer,
                  backgroundColor}) 
  {
  const buttonStyle = {
    backgroundColor: backgroundColor
  }

  return (
    <>
      <div className={containerClassName}>
        <button style={buttonStyle} className={className} onClick={handleClick}>{text}</button>
      </div>
    </>
  )
}

export default Button
