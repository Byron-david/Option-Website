import { useState } from 'react'
import TextInput from '../Input/TextInput.jsx'
import DateInput from '../Input/DateInput.jsx'
import DropdownOptions from '../Input/DropdownOptions.jsx'
import Button from '../Button/Button.jsx'
import AddOption from './AddOption.jsx'
import StrategiesDropdown from '../Input/StrategiesDropdown.jsx'
import styles from './AddTrade.module.css'; 
import { v4 as uuid } from 'uuid';

let nextId = 0;

function AddTradeForm({ newTrade, addTrade, handleClickClose, handleChange }) {
  const [addOption, setAddOption] = useState([]);
  const [strategyValue, setStrategyValue] = useState("stock");

  const dropdownOptions = [
    { id: uuid(), value: "ironCondor", text: "Iron Condor" },
    { id: uuid(), value: "strangle", text: "Strangle" }
  ]

  // const addTrade = (event) => {
  //   event.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     important: Math.random() < 0.5,
  //     id: notes.length + 1,
  //   }
  
  //   setNotes(notes.concat(noteObject))
  //   setNewNote('')
  // }

  const handleButtonClickAdd = () => {
    const newOption = [ ...addOption,
      { id: nextId++,
        strikePrice: "strikePrice" + nextId, 
        optionValue: "optionValue" + nextId, 
        quantity: "quantity" + nextId, 
        exp: "exp" + nextId }
    ];
    
    // Prevents more than 3 additional legs
    if (addOption.length < 3) {
      setAddOption(newOption);
    }
  };

  const handleButtonSave = () => {
    console.log("Saving...");
  };

  return (
    <>
      <div className="containerTemplate">
        <div className="titleTemplate">Add Trade</div>
        <form onSubmit={addTrade}>
          <div className="bodyTemplate">
            <div className={styles.inputContainer}>
              {/* <TextInput placeholder="AAPL" maxLength="4" id="stockSymbol" name="stockSymbol" htmlFor="stockSymbol" text="Symbol Name:" />
              <StrategiesDropdown value={strategyValue} handleChange={setStrategyValue}/>
              <DateInput id="expDate" name="expDate" htmlFor="expDate" text="Exp. Date" />
              <TextInput placeholder="1" inputType="number" id="quantityNumber" name="quantityNumber" htmlFor="quantityNumber" text="Qty:" />
              <DateInput  id="dateExec" name="dateExec" htmlFor="dateExec" text=" Date Exec." /> */}
              <label>Strategies:</label>
              <select 
                className="inputSelect"
                name="strategy"
                value={newTrade.strategy}
                onChange={handleChange}> 
                <DropdownOptions items={dropdownOptions}/>
              </select>
              <TextInput placeholder="AAPL" maxLength="4" id="stockSymbol" name="stockSymbol" htmlFor="stockSymbol" text="Symbol Name:" value={addTrade.symbol} handleChange={handleChange}/>
              {/* <StrategiesDropdown value={strategyValue} handleChange={setStrategyValue}/>
              <DateInput id="expDate" name="expDate" htmlFor="expDate" text="Exp. Date" />
              <TextInput placeholder="1" inputType="number" id="quantityNumber" name="quantityNumber" htmlFor="quantityNumber" text="Qty:" />
              <DateInput  id="dateExec" name="dateExec" htmlFor="dateExec" text=" Date Exec." /> */}
            </div>
            {/* <div id={styles.addTradeLeg}>
              {addOption.map(option => (
              <AddOption key={option.id} handleClick={() => {
                setAddOption(
                  addOption.filter(o =>
                    o.id !== option.id
                  )
                );
              }}
              strikePrice={option.strikePrice} optionValue={option.optionValue} quantity={option.quantity} exp={option.exp} />
              ))}
            <Button text="+ Add Option" className="buttonAdd" handleClick={handleButtonClickAdd} />
            </div> */}
          </div>
          <div className="footerTemplate">
            <Button text="Cancel" backgroundColor="var(--background-color-button-red)" handleClick={handleClickClose} />
            <Button type="submit" text="Save" className="buttonAdd" handleClick={handleButtonSave} />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTradeForm
