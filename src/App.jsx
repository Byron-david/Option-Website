import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput.jsx'
import DateInput from './components/DateInput.jsx'
// import DropdownInput from './components/DropdownInput.jsx'
import Strategies from './components/StrategiesDropdown.jsx'


// function Strategies (props){
//   const strategyNames = {
//     "stock": "Stock",
//     "singleOption": "Single Option",
//     "coveredCall": "Covered Call",
//     "verticalSpread": "Vertical Spread",
//     "strangle": "Strangle",
//     "straddle": "Straddle",
//     "ironCondor": "Iron Condor",
//     "butterfly": "Butterfly",
//     "ratio": "Ratio Spread"
//   };

//   return (
//     {props.animals.map((animal) => {
//       return <li key={animal}>{animal}</li>;
//     })}
//   )
// };

function App() {


  return (
    <>
      <h2>Add Trade</h2>
      <div id="addTrade">
      {/* -Symbol
      -Strike Price
      -Stock Price
      -Premium Collected
      -Exp. Date
      -Spreads?
      -Quantity
      -Date executed
      -Open or Close? */}
        <Strategies htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
        {/* <DropdownInput htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" /> */}
        {/* <DropdownInput htmlFor="actionInput" text="Action:" /> */}
        <TextInput placeholder="AAPL" maxLength="4" id="stockSymbol" name="stockSymbol" htmlFor="stockSymbol" text="Symbol Name:" />
        <TextInput placeholder="50" inputType="number" id="strikePrice" name="strikePrice" htmlFor="strikePrice" text="Strike Price:" />
        <TextInput placeholder="100" inputType="number" iid="stockPrice" name="stockPrice" htmlFor="stockPrice" text="Stock Price:" />
        <TextInput placeholder="10,000" inputType="number" iid="stockValue" name="stockValue" htmlFor="stockValue" text="Stock Value:" />
        <TextInput id="quantityValue" inputType="number" iname="quantityValue" htmlFor="quantityValue" text="Qty:" />
        <DateInput id="expDate" name="expDate" htmlFor="expDate" text="Exp. Date" />
        {/* <CheckboxInput id="checkSpread" name="checkSpread" htmlFor="checkSpread" text="Spread?" /> */}
      </div>

    </>
  )
}

export default App
