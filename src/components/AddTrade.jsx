import { useState } from 'react'
import TextInput from './TextInput.jsx'
import DateInput from './DateInput.jsx'
import Button from './Button.jsx'
import AddOption from './AddOption.jsx'
import StrategiesDropdown from './StrategiesDropdown.jsx'
import { v4 as uuid } from 'uuid';

let nextId = 0;

function AddTrade({ display = "flex", flexDirection = "row", flexWrap = "nowrap", minWidth = "0%"}) {
  const buttonStyle = {
    display: display,
    flexDirection: flexDirection,
    flexWrap: flexWrap,
    minWidth: minWidth
  };

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

  return (
    <>
      <div id="addTrade">
        <div id="addTradeTitle">Add Trade</div>
        <div id="addTradeBody">
          <TextInput placeholder="AAPL" maxLength="4" id="stockSymbol" name="stockSymbol" htmlFor="stockSymbol" text="Symbol Name:" />
          <StrategiesDropdown value={strategyValue} handleChange={setStrategyValue}/>
          <DateInput  id="dateExec" name="dateExec" htmlFor="dateExec" text=" Date Exec." />
          <TextInput placeholder="1" inputType="number" id="quantityNumber" name="quantityNumber" htmlFor="quantityNumber" text="Qty:" />
        </div>
        <div id="addTradeLeg">
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
        </div>
        <div id="addTradeFooter">
          <Button text="+ Add Option" className="buttonAdd" handleClick={handleButtonClickAdd} />
        </div>
      </div>
    </>
  );
}

export default AddTrade
