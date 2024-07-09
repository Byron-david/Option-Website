import Button from '../Button/Button.jsx'
import { useState } from 'react'
import OptionLeg from './OptionLeg.jsx'
import styles from './AddTrade.module.css'; 

function AddLeg({ leg, setLeg, strategy }) {
  const addNewLeg = () => {
    let newLeg = {
                    strike: '', 
                    tradeValue: '', 
                    expDate: '', 
                    quantity: '', 
                  }

    // 3 legs max
    if (leg.length <= 2) setLeg([...leg, newLeg])
  }

  const deleteLeg = (index) => {
    let data = [...leg];
    data.splice(index, 1)
    setLeg(data)
  }

  const handleLegChange = (index, event) => {
    let data = [...leg];
    data[index][event.target.name] = event.target.value;
    setLeg(data);
  }

  let addButton;
  if (strategy === "custom") {
    addButton = <Button handleClick={addNewLeg}
                      className="buttonAdd"
                      text="+ Add Option" />
  }

  return (
    <>
        {leg.map((option, index) => (
                  <OptionLeg key={index}
                            inputs={option}
                            handleChange={e => handleLegChange(index, e)} 
                            handleClick={() => deleteLeg(index)}
                            strategy={strategy}/>
            ))}
      {addButton}
    </>
  );
}

export default AddLeg
