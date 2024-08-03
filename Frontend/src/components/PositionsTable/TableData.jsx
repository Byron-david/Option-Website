import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 

export default function TableData({ stratName, strategy, keys }) {
    return (
        <>

            {keys.map(key =>  {
                let strikes = []
                let exp = []
                let tradeVal = []
                let totalPrice = []
                let className = null
                
                strategy.forEach(item => {
                    let stratVal = item[key]

                    if (stratVal) {
                        if (key === "strikes") {
                            // Adds "C" or "P" to end of strike
                            let strike = `${stratVal}${item.tradetype[0]}`

                            // Adds negative if 
                            if (item.action === "SELL") {
                                strike = '-' + strike
                            }
                            strikes.push(strike)
                        }

                        if (key === "expdate") {
                            stratVal = new Date(stratVal)
                            const yyyy = stratVal.getFullYear().toString();
                            const mm = stratVal.getMonth();
                            const dd = stratVal.getDate();

                            exp.push(`${mm}/${dd}/${yyyy.slice(-2)}`)
                        }

                        if (key === "value") {
                            tradeVal.push(stratVal)
                        }

                        if (key === "price") {
                            totalPrice.push(stratVal)
                        }
                    }
                })
                
                let tableData = strategy[0][key]
                if (key === "action") {
                    // const subAction = strategy[0]["subAction"]
                    // tableData = `${subAction}`
                    const subAction = []
                    strategy.forEach(item => {
                        subAction.push(item["subaction"])
                    })
                    const open = subAction.find((element) => element === "OPEN")
                    const closed = subAction.find((element) => element === "CLOSE")

                    tableData = subAction[0]
                    if (open && closed) {
                        tableData = "ROLL"
                    }
                    if (open) {
                        className = styles["actionOpen"]
                        tableData = <span className={className}>{"Open"}</span>
                    } else {
                        className = styles["actionClose"]
                        tableData = <span className={className}>{"Close"}</span>
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
                    // const strikeFormat = strikes.join(' / ')
                    // tableData = strikeFormat
                    tableData = strikes.map((strike, index) => {
                        let addSlash = null
                        if (index !== (strikes.length - 1)) {
                            addSlash = <span className={styles.slash} >{"/"}</span>
                        }
                        if (strike[strike.length - 1].toLowerCase() === "c") {
                            className = styles["callStrike"]
                        }
                        else {
                            className = styles["putStrike"]
                        }
                        return (
                            <>
                                <div className={className}>{strike}</div> {addSlash}
                            </>
                        )
                    })
                }

                if (key === "expdate") {
                    tableData = exp.join(' / ')
                }
                if (key === "price") {
                    tableData = totalPrice.reduce((accu, curr) => parseFloat(accu) + parseFloat(curr), 0)
                    tableData = tableData.toFixed(2)
                }

                if (key === "value") {
                    tableData = tradeVal.reduce((accu, curr) => parseFloat(accu) + parseFloat(curr), 0)
                    tableData = tableData.toFixed(2)
                }
                return <td>{tableData}</td>
            })}
        </>

    )
}