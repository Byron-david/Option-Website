import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function CustomInput( {width="50px", margin="1rem", padding="0.5rem"}) {
  const inputStyle = {
    width: width,
  }
  const labelStyle = {
    padding: padding,
  }

  const containerStyle = {
    margin: margin
  }

  // Controls state of input
  const [value, setValue] = useState("");

  return (
    <>
      <div style={containerStyle}>
        <label for="symbolName" style={labelStyle}>Symbol Name:</label>
          <input
            style={inputStyle}
            id="symbolName"
            type="text"
            placeholder="AAPL"
            name="symbol"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
      </div>
    </>

  );
}

function Button({ text, color, fontSize, margin }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px",
    margin: margin + "rem"
  };

  return <button style={buttonStyle}>{text}</button>;
}

Button.defaultProps = {
  text: "Click Me!",
  color: "blue",
  fontSize: 12,
  margin: 0.5
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Add Trade</h1>
      <div id="addTrade">
      {/* -Symbol
      -Strike Price
      -Exp. Date
      -Premium Collected
      -Spreads?
      -Quantity
      -Date executed
      -Open or Close? */}
        <CustomInput />
         <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </div>

    </>
  )
}

export default App
