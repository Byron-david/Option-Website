import { useState } from 'react'

// Returns key, values for objects
function OptionItems(props) {
  return (
        Object.keys(props.items).map((key) =>
         <option key={key} value={key}>{props.items[key]}</option>
   )
  );
}

function DropdownInput( { name, id, padding, text, placeholder, htmlFor, list, items }) {
  const inputStyle = {
    placeholder: placeholder,
    htmlFor: htmlFor,
  }
  const labelStyle = {
    padding: padding,
    name: name,
    id: id
  }

  // Controls state of input
  const [textValue, setTextValue] = useState("");

  return (
    <>
      <div>
        <label style={labelStyle}>{text}</label>
        <select 
          style={inputStyle} 
          value={textValue}
          onChange={(event) => setTextValue(event.target.value)}>
          {list}
          <OptionItems items={items}/>
          {/* // <option value="stock">Stock</option>
          // <option value="singleOption">Single Option</option>
          // <option value="coveredCall">Covered Call</option>
          // <option value="verticalSpread">Vertical Spread</option>
          // <option value="strangle">Strangle</option>
          // <option value="straddle">Straddle</option>
          // <option value="ironCondor">Iron Condor</option>
          // <option value="butterfly">Butterfly</option>
          // <option value="ratio">Ratio Spread</option> */}
        </select>
      </div>
    </>
  );
}

DropdownInput.defaultProps = {
  padding: "0.5rem",
  margin: 1 + "rem"
};

export default DropdownInput
