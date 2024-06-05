import { useState } from 'react'

// Returns key, values for objects
function OptionItems(props) {
  return (
    props.items.map((item) => (
      <option key={item.id} value={item.value}>{item.text}</option>
   )
  ));
}

function DropdownInput( { text, placeholder, htmlFor, items, value, onChange }) {
  const inputStyle = {
    placeholder: placeholder,
    htmlFor: htmlFor,
  }

  return (
    <>
      <div>
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

export default DropdownInput
