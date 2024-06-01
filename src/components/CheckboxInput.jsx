import { useState } from 'react'

function CheckboxInput( {  padding, text, id, placeholder, htmlFor, name}) {
  const inputStyle = {
    id: id,
    placeholder: placeholder,
    htmlFor: htmlFor,
    name: name
  }
  const labelStyle = {
    padding: padding,
  }

  // Controls state of input
  const [textValue, setTextValue] = useState("");

  return (
    <>
      <div>
        <label style={labelStyle}>{text}</label>
          <input
            style={inputStyle}
            type="checkbox"
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
          />
      </div>
    </>
  );
}

CheckboxInput.defaultProps = {
  padding: "0.5" + "rem",
  margin: 1 + "rem"
};

export default CheckboxInput
