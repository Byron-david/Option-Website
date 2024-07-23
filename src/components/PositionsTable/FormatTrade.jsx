import { v4 as uuid } from 'uuid';

export default function FormatTrade({ trades, tableHeader }) {
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

    return (
        <>
            {trades.map((trade, index) => {
                const stratName = strategyNames[index]
                const strategy = trade[stratName]

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
                                        // Multiply Option Prices by 100 shares
                                        if (item.strikes) {
                                            stratVal *= 100
                                        }
                                        tradeVal.push(stratVal)
                                    }
                                }
                            })

                            let tableData = strategy[0][key]
                            if (key === "action") {
                                // const subAction = strategy[0]["subAction"]
                                // tableData = `${subAction}`
                                const subAction = []
                                strategy.forEach(item => {
                                    subAction.push(item["subAction"])
                                })
                                const open = subAction.find((element) => element === "OPEN")
                                const closed = subAction.find((element) => element === "CLOSE")

                                tableData = subAction[0]
                                if (open && closed) {
                                    tableData = "ROLL"
                                }
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