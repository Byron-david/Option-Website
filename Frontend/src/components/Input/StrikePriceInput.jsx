import { useState } from 'react'
import TextInput from './TextInput.jsx'
import DropdownInput from './DropdownInput.jsx'

function Strategies(props) {

  const strategyNames = {
    "stock": "Stock",
    "singleOption": "Single Option",
    "coveredCall": "Covered Call",
    "verticalSpread": "Vertical Spread",
    "strangle": "Strangle",
    "straddle": "Straddle",
    "ironCondor": "Iron Condor",
    "butterfly": "Butterfly",
    "ratio": "Ratio Spread"
  };

  return (
    <DropdownInput {...props} items={strategyNames}/>
  );
}

function StrikePriceInput(props) {
  const [strategyValue, setStrategyValue] = useState("Stock");

  function handleChange(e) {
    setStrategyValue(e.target.value);
  }

  if (strategyValue === "ironCondor" || strategyValue === "butterfly") {
      return <Strategies {...props} textValue={strategyValue} onChange={handleChange} htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
  }

  return (
    <>
      <Strategies {...props} onChange={handleChange} htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
      <TextInput placeholder="50" inputType="number" id="strikePrice" name="strikePrice" htmlFor="strikePrice" text="Strike Price:" />
    </>

  );
}

export default StrikePriceInput
