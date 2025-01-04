import OptionItems from '../Input/OptionItems.jsx'

function OptionAction({ option, items, handleChange }) {
  const buyStyle = {
    backgroundColor: `var(--color-button-green)`,
    color: `var(--color-main)`
  }

  const sellStyle = {
    backgroundColor: `var(--color-button-red)`,
    color: `var(--color-main)`
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
