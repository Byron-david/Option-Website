import { useState } from 'react'
import TextInput from './TextInput.jsx'
import DropdownInput from './DropdownInput.jsx'
import { v4 as uuidv4 } from 'uuid';

function StrategiesDropDown(props) {
  const strategyNames = [
    { id: uuidv4(), value: "stock", text: "Stock" },
    { id: uuidv4(), value: "singleOption", text: "Option" },
  ];
  const [strategyValue, setStrategyValue] = useState("stock");

  function handleChange(e) {
    setStrategyValue(e.target.value);
  }

  const dropDown = <DropdownInput 
                      {...props} 
                      value={strategyValue} 
                      items={strategyNames} 
                      onChange={handleChange} 
                      htmlFor="strategyInput" 
                      name="strategyInput" 
                      id="strategyInput" 
                      text="Strategy:" />

  if (strategyValue === "singleOption") {
    return (
      <>
        {dropDown}
        <TextInput placeholder="50" inputType="number" id="strikePrice" name="strikePrice" htmlFor="strikePrice" text="Strike Price:" />
      </>
    );
  }
  else {
    return (
      <>
        {dropDown}
        <TextInput placeholder="100" inputType="number" id="stockPrice" name="stockPrice" htmlFor="stockPrice" text="Stock Price:" />
      </>  
    )
  }
}

export default StrategiesDropDown
