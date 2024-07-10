import OptionItems from '../Input/OptionItems.jsx'

function OptionType({ option, items, handleChange }) {
  const buyStyle = {
    backgroundColor: `var(--background-color-button)`,
    color: `var(--background-color-main)`
  }

  const sellStyle = {
    backgroundColor: `var(--background-color-button-red)`,
    color: `var(--background-color-main)`
  }

  // option.posType === "BUY" ? dropdownStyle.backgroundColor = 


  return (
    <>
      <label>Type: 
        <select 
            // className={option.posType === BUY ? `inputSelect ${styles.buySellButton}` : `inputSelect ${styles.buySellButton}`}
            className="inputSelect"
            style={option.posType === "BUY" ? buyStyle : sellStyle}
            name="posType"
            value={option.posType || ""}
            onChange={handleChange}>
            <OptionItems items={items}/>
        </select>
      </label>

    </>
  );
}

export default OptionType
