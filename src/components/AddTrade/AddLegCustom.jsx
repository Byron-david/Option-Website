import Button from '../Button/Button.jsx'
import AddLeg from './AddLeg.jsx'
import styles from './AddTrade.module.css'; 

function AddLegCustom({ leg, setLeg, strategy, handleClick, handleChange }) {
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

  return (
    <>
        {leg.map((option, index) => (
                  <AddLeg key={index}
                            inputs={option}
                            handleChange={e => handleLegChange(index, e)} 
                            handleClick={() => deleteLeg(index)}
                            strategy={strategy}/>
            ))}
          {/* <label>Strike Price: 
            <input 
              required="required"
              placeholder="50"
              type="number" 
              name="strike" 
              value={inputs.strike || ""} 
              onChange={handleChange}
            />
          </label>
          <label>Value: 
            <input 
              required="required"
              placeholder="1,000"
              type="number" 
              name="tradeValue" 
              value={inputs.tradeValue || ""} 
              onChange={handleChange}
            />
          </label>
          <label>Quantity: 
            <input 
              placeholder="1"
              required="required"
              type="number" 
              name="quantity" 
              value={inputs.quantity || ""} 
              onChange={handleChange}
            />
          </label>
          <label>Expiration:
            <input 
              required="required"
              type="date" 
              name="expDate" 
              value={inputs.expDate || ""} 
              onChange={handleChange}
            />
          </label> */}
      <Button type="button"
                      text="+ Add Option"
                      className="buttonAdd"
                      handleClick={addNewLeg} />
    </>
  );
}

export default AddLegCustom
