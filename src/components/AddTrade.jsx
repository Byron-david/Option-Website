import { useState } from 'react'
import TextInput from './TextInput.jsx'
import DateInput from './DateInput.jsx'
import Button from './Button.jsx'
import AddOption from './AddOption.jsx'
import StrategiesDropdown from './StrategiesDropdown.jsx'

function AddOptionList(props) {
  if (props.items.length === 0) {
    return null;
  }
  return (
    props.items.map((item, index) => ( <AddOption key={index} item={item}/> ))
   );
}

function AddTrade({ display = "flex", flexDirection = "row", flexWrap = "nowrap", minWidth = "0%"}) {
  const buttonStyle = {
    display: display,
    flexDirection: flexDirection,
    flexWrap: flexWrap,
    minWidth: minWidth
  };

  const [addOption, setAddOption] = useState([]);

  const handleButtonClickAdd = () => {
    console.log("Adding....");
    // let newArray = 
    // setArtists([
    //   ...artists, { id: nextId++, name: name } 
    // ]);
  };

  const handleButtonClickRemove = () => {
    console.log("Removing....")
    // setAddOption(addOption - 1);
    console.log(addOption);
  };

  return (
    <>
      <div id="addTrade">
        <div id="addTradeTitle">Add Trade</div>
        <div id="addTradeBody">
          <TextInput placeholder="AAPL" maxLength="4" id="stockSymbol" name="stockSymbol" htmlFor="stockSymbol" text="Symbol Name:" />
          <StrategiesDropdown htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
          <DateInput id="dateExec" name="dateExec" htmlFor="dateExec" text=" Date Exec." />
          <AddOptionList items={addOption} handleClick={handleButtonClickRemove} />
          {/* <TextInput placeholder="50" inputType="number" id="strikePrice" name="strikePrice" htmlFor="strikePrice" text="Strike Price:" /> */}
          {/* <TextInput placeholder="100" inputType="number" id="stockPrice" name="stockPrice" htmlFor="stockPrice" text="Stock Price:" /> */}
          {/* <TextInput placeholder="10,000" inputType="number" id="stockValue" name="stockValue" htmlFor="stockValue" text="Value:" /> */}
          {/* <TextInput placeholder="1" id="quantityValue" inputType="number" iname="quantityValue" htmlFor="quantityValue" text="Qty:" /> */}
        </div>
        <div id="addTradeFooter">
          <Button text="+ Add Option" className="buttonAdd" handleClick={handleButtonClickAdd} />
        </div>
      </div>
    </>
  );
}

export default AddTrade
