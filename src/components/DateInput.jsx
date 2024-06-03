import { useState } from 'react'

function DateInput( { padding="0.5rem", text="Date:", id, name, htmlFor }) {
  const inputStyle = {
    id: id,
    htmlFor: htmlFor,
    name: name
  }
  const labelStyle = {
    padding: padding,
  }

  // Controls state of input
  const [dateValue, setDateValue] = useState("");

  return (
    <>
      <div>
        <label style={labelStyle}>{text}</label>
          <input 
            type="date" 
            style={inputStyle}
            value={dateValue}
            onChange={(event) => setDateValue(event.target.value)}
          />
      </div>
    </>
  );
}

export default DateInput
