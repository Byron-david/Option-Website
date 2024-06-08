import { useState } from 'react'
import TextInput from './TextInput.jsx'
import DateInput from './DateInput.jsx'
import Button from './Button.jsx'
import AddOption from './AddOption.jsx'
import StrategiesDropdown from './StrategiesDropdown.jsx'
import { v4 as uuidv4 } from 'uuid';

let nextId = 0;

function AddTrade({ display = "flex", flexDirection = "row", flexWrap = "nowrap", minWidth = "0%"}) {
  const buttonStyle = {
    display: display,
    flexDirection: flexDirection,
    flexWrap: flexWrap,
    minWidth: minWidth
  };

  let inputNames = { strikePrice: "strikePrice",
                      id: nextId,
                      optionValue: "optionValue",
                      quantity: "quantity",
                      exp: "exp",}

  const [addOption, setAddOption] = useState([]);

  const handleButtonClickAdd = () => {
    console.log("Adding....");
    setAddOption([
      ...addOption,
      { id: nextId++,
        strikePrice: "strikePrice" + nextId, 
        optionValue: "optionValue" + nextId, 
        quantity: "quantity" + nextId, 
        exp: "exp" + nextId }
    ]);
  };

  const handleButtonClickRemove = () => {
    console.log("Removing....")
    setAddOption([
      ...addOption,
      { id: nextId--,
        strikePrice: "strikePrice" + nextId, 
        optionValue: "optionValue" + nextId, 
        quantity: "quantity" + nextId, 
        exp: "exp" + nextId }
    ]);
    // setAddOption(addOption - 1);
    // {artists.map(artist => (
    //   <li key={artist.id}>
    //     {artist.name}{' '}
    //     <button onClick={() => {
    //       setArtists(
    //         artists.filter(a =>
    //           a.id !== artist.id
    //         )
    //       );
    //     }}>
    // };
    };

  return (
    <>
      <div id="addTrade">
        <div id="addTradeTitle">Add Trade</div>
        <div id="addTradeBody">
          <TextInput placeholder="AAPL" maxLength="4" id="stockSymbol" name="stockSymbol" htmlFor="stockSymbol" text="Symbol Name:" />
          <StrategiesDropdown htmlFor="strategyInput" name="strategyInput" id="strategyInput" text="Strategy:" />
          <DateInput  id="dateExec" name="dateExec" htmlFor="dateExec" text=" Date Exec." />
          <TextInput placeholder="1" type="number" id="quantityNumber" name="quantityNumber" htmlFor="quantityNumber" text="Qty:" />
          {addOption.map((option, index) => (
          <AddOption key={index} handleClick={handleButtonClickRemove} strikePrice={option.strikePrice} optionValue={option.optionValue} quantity={option.quantity} exp={option.exp} />
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
