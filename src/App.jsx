import { useState, useEffect } from 'react'
import './App.css'
import AddTradeModal from './components/AddTrade/AddTradeModal.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'
import ImportCsvModal from './components/ImportCsvModal.jsx'
import Button from './components/Button/Button.jsx'
import AddOption from './components/AddTrade/AddLeg.jsx'
import DropdownOptions from './components/Input/DropdownOptions.jsx'
import { v4 as uuid } from 'uuid';
import AddTradeForm from './components/AddTrade/AddTradeForm.jsx'

const dropdownOptions = [
  { id: uuid(), value: "ironCondor", text: "Iron Condor" },
  { id: uuid(), value: "stock", text: "Stock" },
  { id: uuid(), value: "strangle", text: "Strangle" }
]

function App() {
  const [newTrade, setNewTrade] = useState([{}])

  const handleButtonClickAdd = () => {
    // const newOption = [ ...addOption,
    //   { id: nextId++,
    //     strikePrice: "strikePrice" + nextId, 
    //     optionValue: "optionValue" + nextId, 
    //     quantity: "quantity" + nextId, 
    //     exp: "exp" + nextId }
    // ];
    
    // // Prevents more than 3 additional legs
    // if (addOption.length < 3) {
    //   setAddOption(newOption);
    // }
  };

  return (
    <>
      <Navbar />
      <div id="mainContainer">
        <main>
          <div>
            {JSON.stringify(newTrade)}
          </div>
          <AddTradeForm  />
          {/* <AddTradeModal addTrade={addTrade} handleChange={handleChange} newTrade={newTrade}/> */}
          {/* <ImportCsvModal />
          <PositionsTable data={trades}/> */}
        </main>
      </div>
    </>
  )
}

export default App
