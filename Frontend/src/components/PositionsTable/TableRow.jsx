import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import CombineStrikes from './CombineStrikes'
import CombinePrice from './CombinePrice.jsx'
import Button from '../Button/Button.jsx'
import { useState } from 'react';
import ExpandRow from './ExpandRow'

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

const formatDate = (date) => {
    const newDate = new Date(date)
    const yyyy = newDate.getFullYear().toString();
    const mm = newDate.getMonth() + 1;
    const dd = newDate.getDate();
    return `${mm}/${dd}/${yyyy.slice(-2)}`
}

const formatExpDate = (dates) => {
    const allEqual = (arr => dates.every( v => v === arr[0] ))
    if (allEqual) {
        return dates[0]
    } else {
        return dates.join(' / ')
    }
}

export default function TableRow({ trade, stratName }) {
    const [expand, setExpand] = useState(0);

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
        let strike = `${leg.strikes}${leg.tradetype[0]}`

        // Adds negative if 
        if (leg.action === "SELL") {
            strike = '-' + strike
        }

        strikes.push(strike)

        exp.push(formatDate(leg.expdate))

        // Create array for value, price and subAction
        subAction.push(leg.subaction)
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
        expand === 0 ? setExpand(1) : setExpand(0);
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
                    <CombinePrice prices={prices} />
                </td>
                <td>
                    <CombineStrikes key={uuid()} strikes={strikes} />
                </td>
                <td>{totalValue}</td>
                <td>{expdates}</td>
                <td>
                    <div className={styles.editButtons}>
                        <Button text="edit" backgroundColor={`var(--background-color-button-blue)`} />
                        <Button text="del" backgroundColor={`var(--background-color-button-red)`} />
                        {/* <Button text="del" backgroundColor={`var(--background-color-button-red)`} handleClick={() => handleDelete(person.id)} /> */}
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