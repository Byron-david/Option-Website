import { useState } from 'react'

function TextInput( { inputType, maxLength, padding, text, id, placeholder, htmlFor, name}) {
  const inputStyle = {
    id: id,
    htmlFor: htmlFor,
    name: name
  }
  const labelStyle = {
    padding: padding + "rem",
  }

  // Controls state of input
  const [textValue, setTextValue] = useState("");

  return (
    <>
      <div>
        {/* <label style={labelStyle}>{text}</label> */}
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

TextInput.defaultProps = {
  padding: 0.5,
};

export default TextInput
