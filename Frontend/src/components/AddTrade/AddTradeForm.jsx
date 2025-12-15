import { useTradeFormLogic } from '../../hooks/useTradeFormLogic'
import { useState } from 'react'
import tradeService from '../../services/trades.js'
import TradeForm from './TradeForm.jsx';
import formatTrade from '../../functions/formatTrade.js'
import { defaultNewTrade, defaultTrade } from '../../../public/tradeDefaults.js'

function AddTradeForm({ allTrades, setAllTrades, handleClickClose }) {
  const { newTrade, setNewTrade } = useTradeFormLogic();
  const [error, setError] = useState(null)

  const addTrade = async (event) => { // Make sure this is async
    event.preventDefault()
    
    console.log("Created Trade", newTrade)
    const tradeObject = formatTrade(newTrade)

    try {
      // 1. Create the trade on the server
      await tradeService.create(tradeObject);

      // 2. Fetch the updated, correctly formatted list from the server
      //    Instead of using the response from create(), we get the fresh table data.
      const freshTrades = await tradeService.fetchData();
      
      // 3. Update state with the fresh data
      setAllTrades(freshTrades);

      
      setNewTrade(defaultNewTrade);
      if (handleClickClose) handleClickClose();
      
    } catch (err) {
      console.error("Failed to add trade", err);
      setError(err);
    } 
  }
  
  // const addTrade = event => {
  //   event.preventDefault()
    
  //   const tradeObject = formatTrade(newTrade)

  //   const createTrade = async (tradeObject) => {
  //     // setIsLoading(true);
  //     try {
  //       const fetchedData = await tradeService.create(tradeObject);
  //       setAllTrades(allTrades.concat(fetchedData));
  //       setNewTrade(defaultNewTrade)
  //     } 
  //     catch (err) {
  //       setError(err);
  //     } 
  //     // finally {
  //     //   setIsLoading(false);
  //     // }
  //   };
  //   createTrade(tradeObject);

  //   // handleClickClose()

  // }

  return (
    <>
      <div className="containerTemplate">
        <div className="titleTemplate">Add Trade</div>
        <TradeForm onSubmit={addTrade} 
                  handleClickClose={handleClickClose} />

      </div>
    </>
  );
}

export default AddTradeForm
