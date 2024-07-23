import { useState, useEffect } from 'react'
import styles from './PositionsTable.module.css'; 
import { v4 as uuid } from 'uuid';
import Button from '../Button/Button.jsx'
import tradeService from '../../services/trades.js'

const IndividualTrade = (strategies, tableHeader) => {
    {strategies.map((trade) => trade.map((option) => (
        <tr key={uuid()}>
            {Object.keys(tableHeader).map((value) => {
                let tableValue = option[tableHeader[value]]
                if (value === "Action") {
                    const subAction = option["subAction"]
                    tableValue = `${tableValue} to ${subAction}`
                }
                if (value === "Edit") {
                    return (
                        <td key={uuid()}>
                            <div className={styles.editButtons}>
                                <Button text="edit" backgroundColor={`var(--background-color-button-blue)`} />
                                <Button text="del" backgroundColor={`var(--background-color-button-red)`} />
                                {/* <Button text="del" backgroundColor={`var(--background-color-button-red)`} handleClick={() => handleDelete(person.id)} /> */}
                            </div>
                        </td>
                    )
                }
                return (
                    <td key={uuid()}>{tableValue}</td>
                )})
            }
        </tr>
    )))
} 
}



//   const tradesToStrategy = () => {
//     const tradeObj = {}
//     const strikes = []
//     const exp = []
//     const val = []
//     const qty = []
//     const subAction = []

//     combinedTrade.map((pos) => {
//       subAction.push(pos["subAction"])

//       keys.forEach((item) => { 
//         const itemValue = pos[item]
//         if (itemValue) {
//           if (item === "strikes") {
//               // let strike = `${itemValue}${item.strategy[0]}`
//               // if (item.action === "SELL") {
//               //     strike = '-' + strike
//               // }
//               strikes.push(itemValue)
//           }
//           if (item === "exp") {
//             exp.push(itemValue)
//           }

//           if (item === "qty") {
//             qty.push(itemValue)
//           }

//           if (item === "value") {
//             val.push(itemValue)
//           }
//           }
//         })
//     })

//     keys.forEach(item => {
//       let data = combinedTrade[1][item]
//       if (item === "action") {
//         data = subAction[0]
//       }
//       if (item === "strategy") {
//           data = strategy
//       }
//       if (item === "qty") {
//           data = qty.join(' / ')
//       }

//       if (item === "strikes") {
//           data = strikes.join(' / ')
//       }

//       if (item === "exp") {
//           data = exp.join(' / ')
//       }
//       if (item === "price") {
//         data = combinedTrade[0][item]
//         console.log(data);
//       }

//       if (item === "value") {
//         data = val.reduce((accu, curr) => parseFloat(accu) + parseFloat(curr), 0)
//         // data = val.join(' / ')
//       }

//       tradeObj[item] = data
//     })
//     return tradeObj
//     }


export default function Trades({ trades, tableHeader, setTrades }) {
    const strategies = trades.map(item => Object.values(item)[1])
    const strategyNames = trades.map(item => Object.keys(item)[1])
    const keys = tableHeader.map(key =>  { 
        let lowerKey = key.toLowerCase()
        if (key === "Exp. Date") {
          lowerKey = key.split(". ")
          lowerKey = lowerKey.join("")
          lowerKey = lowerKey[0].toLowerCase() + lowerKey.slice(1)
        }
        return (lowerKey)
      })

    const handleDelete = id => {
        console.log(id);
        if (window.confirm("Delete Entry?")) {
          tradeService
            .remove(id)
            .then(setTrades(trades.filter(p => p.id !== id)))
        }
      }

    return (
        <>
            {trades.map((trade, index) => {
                const stratName = strategyNames[index]
                const strategy = trade[stratName]
                // if (stratName === "coveredCall") {
                //     console.log(trade)
                // }

                return (
                    <tr key={uuid()}>
                        {keys.map(key =>  {
                            let strikes = []
                            let exp = []
                            let tradeVal = []
                            strategy.forEach(item => {
                                let stratVal = item[key]
                                if (stratVal) {
                                    if (key === "strikes") {
                                        let strike = `${stratVal}${item.strategy[0]}`
                                        if (item.action === "SELL") {
                                            strike = '-' + strike
                                        }
                                        strikes.push(strike)
                                    }
                                    if (key === "expDate") {
                                        exp.push(stratVal)

                                    }

                                    if (key === "value") {
                                        if (item.strikes) {
                                            stratVal *= 100
                                            console.log("option", stratVal);
                                        }
                                        tradeVal.push(stratVal)
                                    }
                                }
                            })

                            let tableData = strategy[0][key]
                            if (key === "action") {
                                const subAction = strategy[0]["subAction"]
                                tableData = `${subAction}`
                            }
                            if (key === "strategy") {
                                tableData = stratName.split()
                            }
                            if (key === "qty") {
                                let quantity = []
                                strategy.forEach(strat => quantity.push(strat[key]))
                                
                                tableData = quantity.join(' / ')
                            }

                            if (key === "strikes") {
                                tableData = strikes.join(' / ')
                            }

                            if (key === "expDate") {
                                tableData = exp.join(' / ')
                            }
                            if (key === "value") {
                                tableData = tradeVal.reduce((accu, curr) => parseFloat(accu) + parseFloat(curr), 0)
                                tableData = tableData.toFixed(2)
                            }

                            // if (key === "Action") {
                            //     const subAction = option["subAction"]
                            //     tableData = `${tableData} to ${subAction}`
                            // }
                            return (
                                <td key={uuid()}>{tableData}</td>
                            )
                        }
                        )
                        }
                    </tr>
                )

            }
                )
            }
        </>

    )
}