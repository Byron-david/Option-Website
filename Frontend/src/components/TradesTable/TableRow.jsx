import { v4 as uuid } from 'uuid';
import styles from './TradesTable.module.css'; 
import CombineStrikes from './CombineStrikes'
import CombinePrice from './CombinePrice.jsx'
import Button from '../Button/Button.jsx'
import { useState } from 'react';
import ExpandRow from './ExpandRow'
import tradeService from '../../services/trades.js'
import formatDate from '../../functions/formatDate.js'

const subActionFormat = (subAction, className) => {
    const open = subAction.find((element) => element === "OPEN")
    const closed = subAction.find((element) => element === "CLOSE")

    let tableData
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
    return tableData
}

const addPrices = (prices) => {
    let total = prices.reduce((accu, curr) => parseFloat(accu) + parseFloat(curr), 0)
    total = total.toFixed(2)
    return total
}

const formatExpDate = (dates) => {
    if (!dates) {
        return null
    }
    const allEqual = (arr => dates.every( v => v === arr[0] ))
    if (allEqual) {
        return dates[0]
    } else {
        return dates.join(' / ')
    }
}

export default function TableRow({ allTrades, setAllTrades, trade, stratName, index, }) {
    const [expand, setExpand] = useState(0);
    const [error, setError] = useState(null);

    const tradeLeg = trade[Object.keys(trade)[0]]
    const firstLeg = tradeLeg[0]

    let strikes = []
    let exp = []
    let tradeValues = []
    let prices = []
    const subAction = []
    const quantity = []
    let className = null

    tradeLeg.forEach(leg => {
        // Adds "C" or "P" to end of strike
        let strike = `${leg.strikes}${leg.trade_type[0]}`

        // Adds negative if 
        if (leg.action === "SELL") {
            strike = '-' + strike
        }

        if (leg.strikes) {
            strikes.push(strike)
        }
        
        if (leg.expdate) {
            exp.push(formatDate(leg.expdate))
        }

        // Create array for value, price and subAction
        subAction.push(leg.sub_action)
        quantity.push(leg.qty)
        prices.push(leg.price)
        tradeValues.push(leg.value)
    })

    const dateExec = formatDate(firstLeg.date)
    const strategy = stratName.split()
    const qty = quantity.join(' / ')

    const subActionData = subActionFormat(subAction, className)

    const totalPrice = addPrices(prices)
    const price = prices.join(' / ')
    const totalValue = addPrices(tradeValues)
    const expdates = formatExpDate(exp)

    const handleClick = () => {
        if (trade[stratName].length === 1) {
            expand === 0
        } else {
            expand === 0 ? setExpand(1) : setExpand(0);
        }
    }

    const handleDelete = async (event, id) => {
        event.preventDefault()
        const databaseId = allTrades[id].id

        if (window.confirm("Delete Entry?")) {
            try {
                await tradeService.remove(databaseId);
                setAllTrades(allTrades.filter(t => t.id !== databaseId))
                console.log(response);
                return response
              } 
              catch (err) {
                setError(err);
              } 

            // axios way
            // tradeService
            //     .remove(databaseId)
            //     .then(response => {
            //         setAllTrades(allTrades.filter(t => t.id !== databaseId))
            //         console.log(response);
            //         return response
            //     }
            //     )
        }
    }

    const handleUpdate = (event, id) => {
        event.preventDefault()
        const currentStrategy = allTrades[id]
        const stratName = Object.keys(currentStrategy)[0]
        const tradesArray = currentStrategy[stratName]

        const defaultTrade = { 
            symbol: tradesArray[0].symbol, 
            date: tradesArray[0].date
         }

        const defaultStock = {
            action: 'BUY', 
            sub_action: 'OPEN', 
            trade_type: 'STOCK', 
            qty: '', 
            price: '', 
            value: '', 
            exp: null, 
        }

        const defaultLeg = { 
            action: 'BUY',
            sub_action: 'OPEN', 
            trade_type: 'CALL', 
            qty: 1, 
            strikes: '', 
            value: '', 
            exp: '', 
        }

        tradesArray.forEach(leg => 
            console.log(leg)
        )
    }
    
    return (
        <>
            <tr onClick={handleClick} >
                <td>{firstLeg.symbol}</td>
                <td>{dateExec}</td>
                <td>{subActionData}</td>
                <td>{strategy}</td>
                <td>{qty}</td>
                <td>
                    <div className={styles.price}>
                        <CombinePrice prices={prices} />
                    </div>
                </td>
                <td>
                    <CombineStrikes key={uuid()} strikes={strikes} />
                </td>
                <td>{totalValue}</td>
                <td>{expdates}</td>
                <td>
                    <div className={styles.editButtons}>
                        <Button text="Edit"
                        backgroundColor={`var(--color-blue)`}
                        color={`var(--color-main)`}
                        handleClick={event => handleUpdate(event, index)} />

                        <Button text="Del"
                        backgroundColor={`var(--color-red)`}
                        color={`var(--color-main)`}
                        handleClick={event => handleDelete(event, index)} />
                        {/* <Button text="del" backgroundColor={`var(--color-red)`} handleClick={() => handleDelete(person.id)} /> */}
                    </div>
                </td>
            </tr>
            {expand === 1 ?
                <ExpandRow stratName={stratName} trade={trade} key={uuid()} />
                : null
            }
        </>
    )
}