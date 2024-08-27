import { useState } from 'react'
import tradeService from '../../services/trades.js'
import TradeForm from './TradeForm.jsx';
import formatTrade from '../../functions/formatTrade.js'
import { defaultNewTrade, defaultTrade } from '../../../public/tradeDefaults.js'

function AddTradeForm({ allTrades, setAllTrades, handleClickClose }) {
  const [newTrade, setNewTrade] = useState(defaultNewTrade)

  const addTrade = event => {
    event.preventDefault()
    
    console.log(newTrade);

    const tradeObject = formatTrade(newTrade, "strategy")

    // tradeService
    //   .create(tradeObject)
    //   .then(returnedTrade => {
    //     setAllTrades(allTrades.concat(returnedTrade))
    //     setNewTrade(defaultTrade)
    //   })
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
