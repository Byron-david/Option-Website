import { useState } from 'react'

function TextInput( { tradeValue, handleChange, inputType, maxLength, text, id, placeholder, htmlFor, name }) {
  const inputStyle = {
    id: id,
    htmlFor: htmlFor,
    name: name,
  }

  return (
    <>
      <div className="fieldsetDiv">
        <fieldset>
        <legend>{text}</legend>
          <input
            maxLength={maxLength}
            required="required"
            style={inputStyle}
            placeholder={placeholder}
            type={inputType}
            value={tradeValue}
            onChange={handleChange}
          />
        </fieldset>

      </div>
    </>
  );
}

export default TextInput
