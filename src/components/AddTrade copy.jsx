import { useState } from 'react'
import TextInput from './TextInput.jsx'
import DateInput from './DateInput.jsx'
import Button from './Button/Button.jsx'
import AddOption from './AddOption.jsx'
import StrategiesDropdown from './StrategiesDropdown.jsx'
import styles from './AddTrade.module.css'; 
import { v4 as uuid } from 'uuid';

let nextId = 0;

function AddTrade({ handleClickClose }) {
  const [addOption, setAddOption] = useState([]);
  const [strategyValue, setStrategyValue] = useState("stock");

  const handleButtonClickAdd = () => {
    const newOption = [ ...addOption,
      { id: nextId++,
        strikePrice: "strikePrice" + nextId, 
        optionValue: "optionValue" + nextId, 
        quantity: "quantity" + nextId, 
        exp: "exp" + nextId }
    ];
    
    if (addOption.length < 3) {
      setAddOption(newOption);
    }
  };

  const handleButtonSave = () => {
    console.log("Saving...");
  };

  return (
    <>
      <div id="addTrade">
        <div id="addTradeTitle">Add Trade</div>
        <div id="addTradeBody">
          <div className={styles.inputContainer}>
            <TextInput placeholder="AAPL" maxLength="4" id="stockSymbol" name="stockSymbol" htmlFor="stockSymbol" text="Symbol Name:" />
            <StrategiesDropdown value={strategyValue} handleChange={setStrategyValue}/>
            <DateInput id="expDate" name="expDate" htmlFor="expDate" text="Exp. Date" />
            <TextInput placeholder="1" inputType="number" id="quantityNumber" name="quantityNumber" htmlFor="quantityNumber" text="Qty:" />
            <DateInput  id="dateExec" name="dateExec" htmlFor="dateExec" text=" Date Exec." />
          </div>
          <div id={styles.addTradeLeg}>
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
          </div>
        </div>
        <div id="addTradeFooter">
          <Button text="Cancel" backgroundColor="var(--background-color-button-red)" handleClick={handleClickClose} />
          <Button text="Save" className="buttonAdd" handleClick={handleButtonSave} />
        </div>
      </div>
    </>
  );
}

export default AddTrade
