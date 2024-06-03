import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput.jsx'
import DateInput from './components/DateInput.jsx'
import DropdownInput from './components/DropdownInput.jsx'
import CheckboxInput from './components/CheckboxInput.jsx'

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
        <DropdownInput htmlFor="strategyInput" text="Strategy:" />
        <TextInput placeholder="AAPL" maxLength="4" id="stockSymbol" name="stockSymbol" htmlFor="stockSymbol" text="Symbol Name:" />
        <TextInput placeholder="50" id="strikePrice" name="strikePrice" htmlFor="strikePrice" text="Strike Price:" />
        <TextInput placeholder="100" id="stockPrice" name="stockPrice" htmlFor="stockPrice" text="Stock Price:" />
        <TextInput placeholder="10,000" id="stockValue" name="stockValue" htmlFor="stockValue" text="Stock Value:" />
        <DateInput id="expDate" name="expDate" htmlFor="expDate" text="Exp. Date" />
        {/* <CheckboxInput id="checkSpread" name="checkSpread" htmlFor="checkSpread" text="Spread?" /> */}
      </div>

    </>
  )
}

export default App
