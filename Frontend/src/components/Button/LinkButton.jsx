import { useState } from 'react'
import styles from './Button.module.css'; 
import { Link } from "react-router-dom"

function LinkButton({ text = "click",
                  className = styles.link, 
                  backgroundColor,
                  color,
                  border,
                  to
                }) 
  {
  const buttonStyle = {
    backgroundColor: backgroundColor,
    color: color,
    border: border,
  }

  return (
    <Link style={buttonStyle} to={to} className={className}>{text}</Link>
  )
}

export default LinkButton
