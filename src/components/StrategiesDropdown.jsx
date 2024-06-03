import { useState } from 'react'
import DropdownInput from './DropdownInput.jsx'

function Strategies(props) {

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


  return (
    <DropdownInput {...props} items={strategyNames}/>
  );
}

export default Strategies
