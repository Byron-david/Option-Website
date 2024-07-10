import OptionItems from '../Input/OptionItems.jsx'

function OptionAction({ option, items, handleChange }) {
  const buyStyle = {
    backgroundColor: `var(--background-color-button)`,
    color: `var(--background-color-main)`
  }

  const sellStyle = {
    backgroundColor: `var(--background-color-button-red)`,
    color: `var(--background-color-main)`
  }

  return (
    <>
      <label>Action: 
        <select 
            className="inputSelect"
            style={option.action === "BUY" ? buyStyle : sellStyle}
            name="action"
            value={option.action || ""}
            onChange={handleChange}>
            <OptionItems items={items}/>
        </select>
      </label>

    </>
  );
}

export default OptionAction
