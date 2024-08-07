import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import Button from '../Button/Button.jsx'
import FormatStrike from './FormatStrike'
import FormatPrice from './FormatPrice.jsx'

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
    return { strike, strikeClass }
}

const formatDate = (date) => {
    const newDate = new Date(date)
    const yyyy = newDate.getFullYear().toString();
    const mm = newDate.getMonth() + 1;
    const dd = newDate.getDate();
    return `${mm}/${dd}/${yyyy.slice(-2)}`
}

export default function ExpandRow({ trade, stratName }) {
    const tradeLeg = trade[stratName]
    
    return (
        <>
            {tradeLeg.map(leg => (
                <tr key={uuid()} className={styles.individualTrades} >
                    <td>{leg.symbol}</td>
                    <td>{formatDate(leg.date)}</td>
                    <td>{subActionFormat(leg.action)}</td>
                    <td>{leg.tradetype}</td>
                    <td>{leg.qty}</td>
                    <td>
                        <FormatPrice price={leg.price} />
                        {/* {leg.price} */}
                    </td>
                    <td>
                        <FormatStrike leg={leg} />
                    </td>
                    <td>{leg.value}</td>
                    <td>{formatDate(leg.expdate)}</td>
                    <td>{" "}</td>
                </tr>
            ))}
        </>
    )
}