import { useState } from 'react'
// import DropdownInput from './components/DropdownInput.jsx'

function OptionItem( { value, text } ) {
  return <option>{props.animal}</option>
}

function List(props) {
  return (
    <>
        {/* Object.keys(tifs).map(function(key) {
        return <option value={key}>{tifs[key]}</option> */}

        {Object.keys.props.map((function(key)) => {
          return <OptionItem value={key} />;
        })}

        {/* // {props.options.map((option) => {
        //   return <OptionItem key={option} option={option} />;
        // })} */}
    </>

  );
}

// function Strategies (props){
//   const strategyNames = {
//     "stock": "Stock",
//     "singleOption": "Single Option",
//     "coveredCall": "Covered Call",
//     "verticalSpread": "Vertical Spread",
//     "strangle": "Strangle",
//     "straddle": "Straddle",
//     "ironCondor": "Iron Condor",
//     "butterfly": "Butterfly",
//     "ratio": "Ratio Spread"
//   };

//   const strategies = strategyNames.map((strategy) => <option key={strategy} value={strategy}>{strategy}</option>);

//   return (
//       <DropdownInput list=strategies/>
//   )
// };

function Strategies( { name, id, padding, text, placeholder, htmlFor }) {
  const inputStyle = {
    placeholder: placeholder,
    htmlFor: htmlFor,
  }
  const labelStyle = {
    padding: padding,
  }

  const strategyNames = {
    "stock": "Stock",
    "singleOption": "Single Option",
    "coveredCall": "Covered Call",
    "verticalSpread": "Vertical Spread",
    "strangle": "Strangle",
    "straddle": "Straddle",
    "ironCondor": "Iron Condor",
    "butterfly": "Butterfly",
    "ratio": "Ratio Spread"
  };

  // Controls state of input
  const [textValue, setTextValue] = useState("");

  return (
    <>
      <div>
        <label style={labelStyle}>{text}</label>
        <select 
          style={inputStyle} 
          value={textValue}
          onChange={(event) => setTextValue(event.target.value)}>
          <List options={strategyNames}/>
          {/* <option value="stock">Stock</option>
          <option value="singleOption">Single Option</option>
          <option value="coveredCall">Covered Call</option>
          <option value="verticalSpread">Vertical Spread</option>
          <option value="strangle">Strangle</option>
          <option value="straddle">Straddle</option>
          <option value="ironCondor">Iron Condor</option>
          <option value="butterfly">Butterfly</option>
          <option value="ratio">Ratio Spread</option> */}
        </select>
      </div>
    </>
  );
}

Strategies.defaultProps = {
  padding: "0.5rem",
  margin: 1 + "rem"
};

export default Strategies
