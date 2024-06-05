import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput.jsx'
import DateInput from './components/DateInput.jsx'
// import DropdownInput from './components/DropdownInput.jsx'
import StrategiesDropdown from './components/StrategiesDropdown.jsx'
import AddOption from './components/AddOption.jsx'

function App() {

  return (
    <>
      <div id="addTrade">
        <div id="addTradeTitle">Add Trade</div>
        <div id="addTradeBody">
          <TextInput placeholder="AAPL" maxLength="4" id="stockSymbol" name="stockSymbol" htmlFor="stockSymbol" text="Symbol Name:" />
          <StrategiesDropdown htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
          <AddOption />
          {/* <TextInput placeholder="50" inputType="number" id="strikePrice" name="strikePrice" htmlFor="strikePrice" text="Strike Price:" /> */}
          {/* <TextInput placeholder="100" inputType="number" id="stockPrice" name="stockPrice" htmlFor="stockPrice" text="Stock Price:" /> */}
          {/* <TextInput placeholder="10,000" inputType="number" id="stockValue" name="stockValue" htmlFor="stockValue" text="Value:" /> */}
          {/* <TextInput placeholder="1" id="quantityValue" inputType="number" iname="quantityValue" htmlFor="quantityValue" text="Qty:" /> */}
          {/* <DateInput id="expDate" name="expDate" htmlFor="expDate" text="Exp. Date" /> */}
        </div>
      </div>
    </>
  )
}

export default App
