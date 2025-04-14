import { v4 as uuid } from 'uuid';
import styles from './TradesTable.module.css'; 
import Button from '../Button/Button.jsx'
import FormatStrike from './FormatStrike'
import FormatPrice from './FormatPrice.jsx'

const subActionFormat = (action) => {
    let tableData
    if (action === 'OPEN') {
        tableData = <span className={styles["actionOpen"]}>{"Open"}</span>
    } else {
        tableData = <span className={styles["actionClose"]}>{"Close"}</span>
    }
    return tableData
}

const formatDate = (date) => {
    if (!date) {
        return null
    }
    const newDate = new Date(date)
    const yyyy = newDate.getFullYear().toString();
    const mm = newDate.getMonth() + 1;
    const dd = newDate.getDate();
    return `${mm}/${dd}/${yyyy.slice(-2)}`
}

export default function ExpandRow({ strategy, stratName }) {
    const tradeLeg = strategy[stratName]
    if (tradeLeg.length === 1) {
        
    }

    return (
        <>
            {tradeLeg.map(leg => (
                <tr key={uuid()} className={styles.individualTrades} >
                    <td>{}</td>
                    <td>{formatDate(leg.date)}</td>
                    <td>{subActionFormat(leg.sub_action)}</td>
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