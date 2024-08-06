import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import Button from '../Button/Button.jsx'

const subActionFormat = (action) => {
    let tableData
    if (open) {
        tableData = <span className={styles["actionOpen"]}>{"Open"}</span>
    } else {
        tableData = <span className={styles["actionClose"]}>{"Close"}</span>
    }
    return tableData
}

const strikeFormat = (leg) => {
    let strikeClass = null
    let strike = null

    if (leg.tradetype[0].toLowerCase() === "c") {
        strikeClass = styles["callStrike"]
        strike = leg.strikes + 'C'
    }
    else {
        strikeClass = styles["putStrike"]
        strike = leg.strikes + 'P'
    }
    return strike
}

const formatDate = (date) => {
    const newDate = new Date(date)
    const yyyy = newDate.getFullYear().toString();
    const mm = newDate.getMonth() + 1;
    const dd = newDate.getDate();
    return `${mm}/${dd}/${yyyy.slice(-2)}`
}

export default function TableExpansion({ trade, stratName }) {
    const tradeLeg = trade[stratName]
    // const firstLeg = tradeLeg[0]

    // let strikes = []
    // let exp = []
    // let tradeValues = []
    // let prices = []
    // const subAction = []
    // const quantity = []

    // tradeLeg.forEach(leg => {
    //     // Adds "C" or "P" to end of strike
    //     let strike = `${leg.strikes}${leg.tradetype[0]}`

    //     // Adds negative if 
    //     if (leg.action === "SELL") {
    //         strike = '-' + strike
    //     }

    //     strikes.push(strike)

    //     exp.push(formatDate(leg.expdate))

    //     // Create array for value, price and subAction
    //     subAction.push(leg.subaction)
    //     quantity.push(leg.qty)
    //     prices.push(leg.price)
    //     tradeValues.push(leg.value)
    // })

    // const strategy = stratName.split()
    // const qty = quantity.join(' / ')

    // const subActionData = subActionFormat(subAction, className)

    // const totalPrice = addPrices(prices)
    // const price = prices.join(' / ')
    // const totalValue = addPrices(tradeValues)
    // // const expdates = exp.join(' / ')
    let strike

    const strikeClass = strikeFormat(tradeLeg[0])
    console.log(strikeClass);
    
    return (
        <>
            {tradeLeg.map(leg => (
                <tr key={uuid()}>
                    <td>{leg.symbol}</td>
                    <td>{formatDate(leg.date)}</td>
                    <td>{subActionFormat(leg.action)}</td>
                    <td>{leg.tradetype}</td>
                    <td>{leg.qty}</td>
                    <td>{leg.price}</td>
                    <td>
                        <div className={strikeFormat(leg)}>{strike}</div>
                    </td>
                    <td>{leg.value}</td>
                    <td>{formatDate(leg.expdate)}</td>
                    <td>{" "}</td>
                </tr>
            ))}
        </>
    )
}