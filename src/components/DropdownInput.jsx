import { useState } from 'react'

// Returns key, values for objects
function OptionItems(props) {
  return (
        Object.keys(props.items).map((key) =>
         <option key={key} value={key}>{props.items[key]}</option>
   )
  );
}

function DropdownInput( { name, id, padding, text, placeholder, htmlFor, items, value, onChange }) {
  const inputStyle = {
    placeholder: placeholder,
    htmlFor: htmlFor,
  }
  const labelStyle = {
    padding: padding,
    name: name,
    id: id
  }

  return (
    <>
      <div>
        {/* <label style={labelStyle}>{text}</label> */}
        <fieldset>
          <legend>{text}</legend>
          <select 
            style={inputStyle} 
            value={value}
            onChange={onChange}> 
            <OptionItems items={items}/>
          </select>
        </fieldset>
      </div>
    </>
  );
}

DropdownInput.defaultProps = {
  padding: "0.5rem",
  margin: 1 + "rem"
};

export default DropdownInput
