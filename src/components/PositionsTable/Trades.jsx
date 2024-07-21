import { useState, useEffect } from 'react'
import styles from './PositionsTable.module.css'; 
import { v4 as uuid } from 'uuid';
import Button from '../Button/Button.jsx'
import tradeService from '../../services/trades.js'

export default function Trades({ trades, tableHeader, setTrades }) {
    const strategies = trades.map(item => Object.values(item)[1])

    const handleDelete = id => {
        console.log(id);
        if (window.confirm("Delete Entry?")) {
          tradeService
            .remove(id)
            .then(returnedTrade => {
                setTrades(trades.filter(p => p.id !== id))
            })
        }
      }

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
        </>

    )
}