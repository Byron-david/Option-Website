import { useState, useEffect } from 'react'
import styles from './PositionsTable.module.css'; 
import { v4 as uuid } from 'uuid';

const tableHeadNames = {
    "Symbol": "symbol", 
    "Date": "dateExec",
    "Action": "action", 
    "Type": "posType", 
    "Qty": "quantity", 
    "Price": "stockPrice", 
    "Strike": "strike",  
    "Value": "tradeValue", 
    "Exp. Date": "expDate", 
}

export default function Trades({ trades }) {
    const rows = trades.map(item => Object.values(item)[1])
    const trade = rows.map(option => option)
    // row.map((option) => Object.values(option).map((value, index) => console.log(`${Object.keys(option)[index]}: ${value}`)))

    return (
        <>
            {rows.map((row) => row.map((option) => (
                    <tr key={uuid()}>
                        {Object.keys(tableHeadNames).map((value) => {
                            let tableValue = option[tableHeadNames[value]]
                            if (value === "Action") {
                                const subAction = option["subAction"]
                                tableValue = `${tableValue} to ${subAction}`
                            }
                            return (
                                <td key={uuid()}>{tableValue}</td>
                            )})
                        }
                    </tr>
                )))
            }
        </>

    )
}