import { useState } from 'react'

function TextInput( { width, padding, text, id, placeholder, htmlFor, name}) {
  const inputStyle = {
    width: width,
    id: id,
    placeholder: placeholder,
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
          style={inputStyle}
          type="text"
          value={textValue}
          onChange={(event) => setTextValue(event.target.value)}
        />
      </div>
    </>
  );
}

TextInput.defaultProps = {
  width: "80px",
  padding: "0.5" + "rem",
  margin: 1 + "rem"
};

export default TextInput
