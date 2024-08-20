import { useState } from 'react'
import OptionItems from '../Input/OptionItems.jsx'
import Button from '../Button/Button.jsx'
import { v4 as uuid } from 'uuid';
import AddLeg from './AddLeg.jsx'
import tradeService from '../../services/trades.js'
import AddStock from './AddStock.jsx';
import TradeForm from './TradeForm.jsx';
import { 
  defaultNewTrade, 
  defaultTrade, 
  defaultStock, 
  defaultLeg, 
  strategyOptions, 
  action, 
  subAction, 
  posType } from '../../../public/tradeDefaults.js'

function AddTradeForm({ allTrades, setAllTrades, handleClickClose, header }) {
  const [newTrade, setNewTrade] = useState(defaultNewTrade)
  // const [stock, setStock] = useState({...defaultStock})
  // const [leg, setLeg] = useState([])
  const [strategy, setStrategy] = useState("Stock");

  const handleTrade = (event) => {
    setNewTrade(values => ({...values, [event.target.name]: event.target.value.toUpperCase()}))
  }

  const handleStock = (event) => {
    setStock(values => ({...values, [event.target.name]: event.target.value}))
  }

  const handleStrategy = (event) => {
    const updateStrategy = event.target.value
    setStrategy(updateStrategy)

    const findQty = strategyOptions.find(element => element.value === updateStrategy)

    if (updateStrategy === "Stock" || updateStrategy === "Covered Call") {
      setStock({...defaultStock})
    }
    else {
      setStock({})
    }

    setLeg([])
    for (let i = 0; i < findQty.quantity; i++ ) {
      const newLeg = { ...defaultLeg }

      if (i > 0 && i < 3) {
        newLeg.action = "SELL"
      }

      if (updateStrategy === "Iron Condor") {
        if (i < 2) {
          newLeg.trade_type = "PUT"
        }
      }

      if (updateStrategy === "Covered Call") {
        newLeg.action = "SELL"
      }

      if (updateStrategy === "Strangle" ) {
        newLeg.action = "SELL"
        if (i < 1) {
          newLeg.trade_type = "PUT"
        }
      }

      setLeg((prev) => {
        const newState = [...prev, newLeg]
        return newState
      })
    }
  }

  const valueAdjust = (combinedTrade, value) => {
    combinedTrade.map(t => t.action === "BUY" ? t[value] = `${t[value] * -1}` : t[value] )
  }

  const addTrade = event => {
    event.preventDefault()
    let combinedTrade = []
    
    if (leg.length !== 0 && Object.keys(stock).length !== 0) {
      const newStock = {...newTrade, ...stock}
      const newLeg = leg.map(prev => ({...newTrade, ...prev}))
      combinedTrade = combinedTrade.concat(newStock, ...newLeg)
    }
    else if (leg.length !== 0) {
      combinedTrade = leg.map(prev => ({...newTrade, ...prev}))

    }
    else {
      combinedTrade = [{...newTrade, ...stock}]
    }
  
    valueAdjust(combinedTrade, "value")
    valueAdjust(combinedTrade, "price")

    const tradeObject = {[strategy]: combinedTrade}

    tradeService
      .create(tradeObject)
      .then(returnedTrade => {
        setAllTrades(allTrades.concat(returnedTrade))
        setNewTrade(defaultTrade)
      })
      // handleClickClose()
  }

//   <form action ="/dashboard/trades" onSubmit={addTrade} method="POST">
//   <div className="bodyTemplate">
//     <div className="inputContainer">
//         <label>Symbol: 
//           <input 
//             type="text" 
//             name="symbol" 
//             value={newTrade.symbol || ""} 
//             onChange={handleTrade}
//             placeholder="AAPL"
//             maxLength="4"
//           />
//         </label>
//         <label>Strategy:
//           <select 
//               className="inputSelect"
//               name="strategy"
//               value={strategy}
//               onChange={handleStrategy}> 
//               <OptionItems items={strategyOptions}/>
//           </select>
//         </label>
//         <label>Date Exec.:
//           <input 
//             type="date" 
//             name="date" 
//             value={newTrade.date || ""} 
//             onChange={handleTrade}
//           />
//         </label>
//     </div>
//     <AddStock strategy={strategy} items={action} handleChange={handleStock} stock={stock} itemSubAction={subAction} />
//     <AddLeg leg={leg} setLeg={setLeg} strategy={strategy} itemTypes={posType} itemActions={action} newLeg={defaultLeg} itemSubAction={subAction} />
//   </div>
//   <div className="footerTemplate">
//     <Button text="Cancel" backgroundColor="var(--background-color-button-red)" handleClick={handleClickClose} />
//     <Button type="submit" text="Save" className="buttonAdd" />
//   </div>
// </form>

  return (
    <>
      <div className="containerTemplate">
        <div className="titleTemplate">Add Trade</div>
        <TradeForm newTrade={newTrade} setNewTrade={setNewTrade} onSubmit={addTrade} handleClickClose={handleClickClose} />
      </div>
    </>
  );
}

export default AddTradeForm
