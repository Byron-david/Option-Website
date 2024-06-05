import { useState } from 'react'
import TextInput from './TextInput.jsx'
import DateInput from './DateInput.jsx'

function Button({ text = "+", color = "white" }) {
  const buttonStyle = {
    color: color,
  }
  return (
    <button style={buttonStyle}>{text}</button>
  )
}

function AddOptionButtons({ display = "flex"}) {
  const buttonStyle = {
    display: display,
  }
  
  return (
    <>
      <div style={buttonStyle}>
        <Button text="+"/>
        <Button text="x"/>
      </div>
    </>
  )
}

function AddOption({ display = "flex", flexDirection = "row", flexWrap = "nowrap", minWidth = "0%"}) {
  const buttonStyle = {
    display: display,
    flexDirection: flexDirection,
    flexWrap: flexWrap,
    minWidth: minWidth
  }

  return (
    <>
      <div className="addOption">
        <AddOptionButtons />
        <TextInput placeholder="50" inputType="number" id="strikePrice" name="strikePrice" htmlFor="strikePrice" text="Strike Price:" />
        <TextInput placeholder="1,000" inputType="number" id="optionValue" name="optionValue" htmlFor="optionValue" text="Value:" />
        <TextInput placeholder="1" id="quantityValue" inputType="number" iname="quantityValue" htmlFor="quantityValue" text="Qty:" />
        <DateInput id="expDate" name="expDate" htmlFor="expDate" text="Exp. Date" />
      </div>
    </>
  );
}

export default AddOption
