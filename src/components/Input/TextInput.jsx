import { useState } from 'react'

function TextInput( { inputType, maxLength, text, id, placeholder, htmlFor, name }) {
  const inputStyle = {
    id: id,
    htmlFor: htmlFor,
    name: name,
  }

  // Controls state of input
  const [textValue, setTextValue] = useState("");

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
            value={textValue}
            onChange={(event) => setTextValue(event.target.value.toUpperCase())}
          />
        </fieldset>

      </div>
    </>
  );
}

export default TextInput
