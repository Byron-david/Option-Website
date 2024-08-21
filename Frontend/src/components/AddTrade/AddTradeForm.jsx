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
  strategyOptions } from '../../../public/tradeDefaults.js'
import formatTrade from '../../functions/formatTrade.js'

function AddTradeForm({ allTrades, setAllTrades, handleClickClose, header }) {
  const [newTrade, setNewTrade] = useState(defaultNewTrade)

  const addTrade = event => {
    event.preventDefault()
    
    const tradeObject = formatTrade(newTrade)

    tradeService
      .create(tradeObject)
      .then(returnedTrade => {
        setAllTrades(allTrades.concat(returnedTrade))
        setNewTrade(defaultTrade)
      })
      // handleClickClose()
  }

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
