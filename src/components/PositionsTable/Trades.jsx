import { useState, useEffect } from 'react'
import styles from './PositionsTable.module.css'; 
import { v4 as uuid } from 'uuid';

export default function Trades({ trades, tableHeader }) {
    const strategies = trades.map(item => Object.values(item)[1])

    return (
        <>
            {strategies.map((trade) => trade.map((option) => (
                    <tr key={uuid()}>
                        {Object.keys(tableHeader).map((value) => {
                            let tableValue = option[tableHeader[value]]
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