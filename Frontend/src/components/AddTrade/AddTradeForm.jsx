import { useState } from 'react'
import tradeService from '../../services/trades.js'
import TradeForm from './TradeForm.jsx';
import formatTrade from '../../functions/formatTrade.js'
import { defaultNewTrade, defaultTrade } from '../../../public/tradeDefaults.js'

function AddTradeForm({ allTrades, setAllTrades, handleClickClose }) {
  const [newTrade, setNewTrade] = useState(defaultNewTrade)

  const addTrade = event => {
    event.preventDefault()
    
    let strategy
    const hasStock = Object.keys(newTrade.stock).length
    const stockLegs = Object.keys(newTrade.legs).length
    // console.log("stock length" ,Object.keys(newTrade.stock).length);
    // console.log("leg length" ,Object.keys(newTrade.legs).length);
    // console.log("stock action", newTrade.stock.action);
    // console.log("option action", newTrade.legs[0].action);

    // Iron Condor
    if (hasStock === 0 && stockLegs === 4) {
      //   const defaultLeg = { 
      //     action: 'BUY',
      //     sub_action: 'OPEN', 
      //     trade_type: 'CALL', 
      //     qty: 1, 
      //     strikes: '', 
      //     value: '', 
      //     exp: '', 
      // }
      
      // Check Call/Put count
      const countDuplicate = () => {
        const duplicates = newTrade.legs.reduce((acc, item) => {
          let newItem = acc.find((i) => i.trade_type === item.trade_type);
          
          if (newItem) {
            newItem.count += 1;
          } else {
            acc.push({ trade_type: item.trade_type, count: 1 });
          }
          
          return acc;
        }, []);

        return duplicates
      }

      const checkStrikes = newTrade.legs.reduce((acc, item) => {
        let newStrike = acc.find((i) => i.strikes === item.strikes);
        let newTradeType = acc.find((i) => i.trade_type === item.trade_type);
        
        if (newStrike && newTradeType) {
          newStrike.count += 1;
        } else {
          acc.push({ strikes: item.strikes, trade_type: item.trade_type, count: 1 });
        }
        
        return acc;
      }, []).reduce((acc, curr) => curr.count > 1 ? acc.concat(curr) : acc, []);

      // Butterfly
      if (countDuplicate()[0].count === 4) {
        if (checkStrikes[0].count === 2) {
          console.log("butterfly");
          strategy = "Butterfly"
        }
      }


    }


    // Covered Call
    if (newTrade.stock.action === "BUY"
      && newTrade.legs[0].action === "SELL"
      && stockLegs === 1) {
      console.log("Covered Call");
      strategy = "Covered Call"
    } 

    // Strangle

    // Vertical Spread

    // Option

    // Stock
    
    // Ratio
    
    // Custom

    // if (Object.keys(newTrade.stock).length === 0) {
    //   console.log("stock no");
    // }

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
