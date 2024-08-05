import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import FormatStrikes from './FormatStrikes'

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

export default function TableRow({ trade, stratName }) {
    const tradeLeg = trade[stratName]
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

        // Format Date
        const newDate = new Date(leg.expdate)
        const yyyy = newDate.getFullYear().toString();
        const mm = newDate.getMonth();
        const dd = newDate.getDate();

        exp.push(`${mm}/${dd}/${yyyy.slice(-2)}`)

        // Create array for value, price and subAction
        subAction.push(leg.subaction)
        quantity.push(leg.qty)
        prices.push(leg.price)
        tradeValues.push(leg.value)
    })

    const strategy = stratName.split()
    const qty = quantity.join(' / ')

    const subActionData = subActionFormat(subAction, className)

    const totalPrice = addPrices(prices)
    const totalValue = addPrices(tradeValues)
    const expdates = exp.join(' / ')

    return (
        <tr>
            <td>{firstLeg.symbol}</td>
            <td>{firstLeg.date}</td>
            <td>{subActionData}</td>
            <td>{strategy}</td>
            <td>{qty}</td>
            <td>{totalPrice}</td>
            <td>
                <FormatStrikes key={uuid()} strikes={strikes} />
            </td>
            <td>{totalValue}</td>
            <td>{expdates}</td>
        </tr>
    )
}