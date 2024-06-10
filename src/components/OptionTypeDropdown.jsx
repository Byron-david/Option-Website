import { useState } from 'react'
import DropdownInput from './DropdownInput.jsx'
import { v4 as uuidv4 } from 'uuid';

export default function OptionTypeDropdown() {
  const optionType = [
    { id: uuidv4(), value: "put", text: "Put" },
    { id: uuidv4(), value: "call", text: "Call" },
  ];
  const [value, setValue] = useState("");

  return (
    <DropdownInput 
      value={value} 
      items={optionType} 
      onChange={e => setValue(e.target.value)} 
      htmlFor="optionTypes" 
      name="optionTypes" 
      id="optionTypes" 
      text="Type:" />
  )
}


