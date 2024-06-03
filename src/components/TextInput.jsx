import { useState } from 'react'

function TextInput( { maxLength, padding, text, id, placeholder, htmlFor, name}) {
  const inputStyle = {
    id: id,
    htmlFor: htmlFor,
    name: name
  }
  const labelStyle = {
    padding: padding,
  }

  // const containerStyle = {
  //   justifyContent: justifyContent
  // }

  // Controls state of input
  const [textValue, setTextValue] = useState("");

  return (
    <>
      <div>
        <label style={labelStyle}>{text}</label>
        <input
          maxLength={maxLength}
          required="required"
          style={inputStyle}
          placeholder={placeholder}
          type="text"
          value={textValue}
          onChange={(event) => setTextValue(event.target.value.toUpperCase())}
        />
      </div>
    </>
  );
}

TextInput.defaultProps = {
  padding: "0.5rem",
  margin: 1 + "rem"
};

export default TextInput
