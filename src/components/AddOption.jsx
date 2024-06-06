import { useState } from 'react'
import TextInput from './TextInput.jsx'
import DateInput from './DateInput.jsx'

function Button({ text = "x", handleClick, className }) {
  // const buttonStyle = {
  //   color: color,
  //   backgroundColor: backgroundColor,
  // }
  return (
    <button className={className} onClick={handleClick}>{text}</button>
  )
}

function AddOption({ handleClick }) {
  return (
    <>
      <div className="addOption">
        <Button handleClick={handleClick} className="buttonRemove" />
        <TextInput placeholder="50" inputType="number" id="strikePrice" name="strikePrice" htmlFor="strikePrice" text="Strike Price:" />
        <TextInput placeholder="1,000" inputType="number" id="optionValue" name="optionValue" htmlFor="optionValue" text="Value:" />
        <TextInput placeholder="1" id="quantityValue" inputType="number" name="quantityValue" htmlFor="quantityValue" text="Qty:" />
        <DateInput id="expDate" name="expDate" htmlFor="expDate" text="Exp. Date" />
      </div>
    </>
  );
}

export default AddOption
