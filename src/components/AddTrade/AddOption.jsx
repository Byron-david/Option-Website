import { useState } from 'react'
import TextInput from '../Input/TextInput.jsx'
import DateInput from '../Input/DateInput.jsx'
import Button from '../Button/Button.jsx'
import styles from './AddTrade.module.css'; 

function AddOption({ handleClick, strikePrice, optionValue, quantity, exp }) {
  return (
    <>
      <div className={styles.addOption}>
        <Button handleClick={handleClick} className="buttonRemove" />
        <TextInput placeholder="50" inputType="number" id={strikePrice} name={strikePrice} htmlFor={strikePrice} text="Strike Price:" />
        <TextInput placeholder="1,000" inputType="number" id={optionValue} name={optionValue} htmlFor={optionValue} text="Value:" />
        <TextInput placeholder="1" id={quantity} inputType="number" name={quantity} htmlFor={quantity} text="Qty:" />
        <DateInput id={exp} name={exp} htmlFor={exp} text="Exp. Date" />
      </div>
    </>
  );
}

export default AddOption
