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


export default function Trades({ trades, tableHeader, setTrades }) {
    const strategies = trades.map(item => Object.values(item)[1])
    const strategyNames = trades.map(item => Object.keys(item)[1])

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
                        {Object.keys(tableHeader).map(value =>  {
                            const headerKey = tableHeader[value]
                            let strikes = []
                            let exp = ""
                            strategy.forEach(item => {
                                if (item[headerKey]) {
                                    if (value === "Strike(s)") {
                                        let strike = `${item[headerKey]}${item.posType[0]}`
                                        if (item.action === "SELL") {
                                            strike = '-' + strike
                                        }
                                        strikes.push(strike)
                                    }
                                    if (value === "Exp. Date") {
                                        if (item[headerKey] !== exp) {
                                            exp = item[headerKey]
                                        }
                                    }
                                }
                            })

                            let tableData = strategy[0][headerKey]

                            if (value === "Action") {
                                const subAction = strategy[0]["subAction"]
                                tableData = `${subAction}`
                            }
                            if (value === "Strategy") {
                                tableData = stratName.split()
                            }
                            if (value === "Qty") {
                                let quantity = []
                                strategy.forEach(strat => quantity.push(strat[headerKey]))
                                
                                tableData = quantity.join(' / ')
                            }

                            if (value === "Strike(s)") {
                                tableData = strikes.join(' / ')
                            }

                            if (value === "Exp. Date") {
                                tableData = exp
                            }
                            // if (value === "Action") {
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