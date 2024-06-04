import { useState } from 'react'

// Returns key, values for objects
function OptionItems(props) {
  return (
        Object.keys(props.items).map((key) =>
         <option key={key} value={key}>{props.items[key]}</option>
   )
  );
}

// const ClientChoice = (props) => {
//   const [selectedClient,setSelectedClient] = useState([]);

//   function handleSelectChange(event) {
//       setSelectedClient(event.target.value);
//   }

//   return (
//       <select value={selectedClient} onChange={handleSelectChange}>
//           <option value="one">One</option>
//           <option value="two">Two</option>
//           <option value="three">Three</option>
//       </select>
//   )
// }


function DropdownInput( { name, id, padding, text, placeholder, htmlFor, items }) {
  const inputStyle = {
    placeholder: placeholder,
    htmlFor: htmlFor,
  }
  const labelStyle = {
    padding: padding,
    name: name,
    id: id
  }

  // Controls state of input
  const [textValue, setTextValue] = useState("Stock");

  return (
    <>
      <div>
        {/* <label style={labelStyle}>{text}</label> */}
        <fieldset>
          <legend>{text}</legend>
          <select 
            style={inputStyle} 
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}> 
            <OptionItems items={items}/>
          </select>
        </fieldset>
      </div>
    </>
  );
}

DropdownInput.defaultProps = {
  padding: "0.5rem",
  margin: 1 + "rem"
};

export default DropdownInput
