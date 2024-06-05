import { useState } from 'react'

function DateInput( { text="Date:", id, name, htmlFor }) {
  const inputStyle = {
    id: id,
    htmlFor: htmlFor,
    name: name
  }

  // Controls state of input
  const [dateValue, setDateValue] = useState("");

  return (
    <>
    <div> 
        <fieldset>
          <legend>{text}</legend>
            <input 
              type="date" 
              style={inputStyle}
              value={dateValue}
              onChange={(event) => setDateValue(event.target.value)}
            />
        </fieldset>
      </div>
    </>
  );
}

export default DateInput
