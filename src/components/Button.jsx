import { useState } from 'react'

function Button({ text = "x", handleClick, className, }) {
  // const buttonStyle = {
  //   color: color,
  //   backgroundColor: backgroundColor,
  // }
  return (
    <button className={className} onClick={handleClick}>{text}</button>
  )
}

export default Button
