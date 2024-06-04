import { useState } from 'react'
import Strategies from './StrategiesDropdown.jsx'

function StrikePriceInput(props) {
  const strategyID = document.getElementById("strategyInput");
  let value = props.textValue;

  console.log(value);
  if (value === "Iron Condor") {
    console.log("Iron Condor");
  }

  return (
    <Strategies {...props} htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
  );
}



export default StrikePriceInput
