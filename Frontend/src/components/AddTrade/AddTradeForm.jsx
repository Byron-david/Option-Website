import { useState } from 'react'
import { TradeProvider } from '../../contexts/TradeContext.jsx';
import tradeService from '../../services/trades.js'
import TradeForm from './TradeForm.jsx';
import formatTrade from '../../functions/formatTrade.js'
import { defaultNewTrade, defaultTrade } from '../../../public/tradeDefaults.js'

function AddTradeForm({ allTrades, setAllTrades, handleClickClose }) {
  const [newTrade, setNewTrade] = useState(defaultNewTrade)
  const [error, setError] = useState(null)

  const addTrade = event => {
    event.preventDefault()
    
    const tradeObject = formatTrade(newTrade)

    console.log(tradeObject)
    // const createTrade = async (tradeObject) => {
    //   // setIsLoading(true);
    //   try {
    //     const fetchedData = await tradeService.create(tradeObject);
    //     setAllTrades(allTrades.concat(fetchedData));
    //     setNewTrade(defaultNewTrade)
    //   } 
    //   catch (err) {
    //     setError(err);
    //   } 
    //   // finally {
    //   //   setIsLoading(false);
    //   // }
    // };
    // createTrade(tradeObject);

    // handleClickClose()

  }

  return (
    <>
      <div className="containerTemplate">
        <div className="titleTemplate">Add Trade</div>
        <TradeProvider>
          <TradeForm onSubmit={addTrade} 
                    handleClickClose={handleClickClose} />
        </TradeProvider>

      </div>
    </>
  );
}

export default AddTradeForm
