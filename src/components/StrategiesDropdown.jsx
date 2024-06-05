import { useState } from 'react'
import TextInput from './TextInput.jsx'
import DropdownInput from './DropdownInput.jsx'
import { v4 as uuidv4 } from 'uuid';

function StrategiesDropDown(props) {
  const strategyNames = [
    { id: uuidv4(), value: "stock", text: "Stock" },
    { id: uuidv4(), value: "singleOption", text: "Option" },
  ]

  const [strategyValue, setStrategyValue] = useState("Stock");

  function handleChange(e) {
    setStrategyValue(e.target.value);
  }

  // if (strategyValue === "stock") {
  //     return <DropdownInput {...props} items={strategyNames} textValue={strategyValue} onChange={handleChange} htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
  // }

  // if (strategyValue === "ironCondor" || strategyValue === "butterfly") {
  //     return <DropdownInput {...props} items={strategyNames} textValue={strategyValue} onChange={handleChange} htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
  // }

  return (
    <>
      <DropdownInput {...props} items={strategyNames} onChange={handleChange} htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
      <TextInput placeholder="50" inputType="number" id="strikePrice" name="strikePrice" htmlFor="strikePrice" text="Strike Price:" />
    </>
  );
}

export default StrategiesDropDown
