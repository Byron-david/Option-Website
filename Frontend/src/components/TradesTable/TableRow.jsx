import { v4 as uuid } from 'uuid';
import styles from './TradesTable.module.css'; 
import CombineStrikes from './CombineStrikes'
import CombinePrice from './CombinePrice.jsx'
import Button from '../Button/Button.jsx'
import { useState } from 'react';
import ExpandRow from './ExpandRow'
import tradeService from '../../services/trades.js'
import formatDate from '../../functions/formatDate.js'
import Modal from '../Modal/Modal.jsx' 
import UpdateTradeForm from '../AddTrade/UpdateTradeForm.jsx'

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

export default function TableRow({ allTrades, setAllTrades, strategy, stratName, index, }) {
    const [expand, setExpand] = useState(0);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [error, setError] = useState(null);

    // FIX: Guard against empty trades to prevent crash
    if (!strategy.trades || strategy.trades.length === 0) {
        return null; // Or return <tr /> with an error message
    }

    const firstLeg = strategy.trades[0]

    let strikes = []
    let exp = []
    let tradeValues = []
    let prices = []
    const subAction = []
    const quantity = []
    let className = null

    strategy.trades.forEach(leg => {
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
    const strategyName = stratName.split()
    const qty = quantity.join(' / ')

    const subActionData = subActionFormat(subAction, className)

    const totalPrice = addPrices(prices)
    const price = prices.join(' / ')
    const totalValue = addPrices(tradeValues)
    const expdates = formatExpDate(exp)

    const handleClick = () => {
        if (strategy.trades.length === 1) {
            expand === 0
        } else {
            expand === 0 ? setExpand(1) : setExpand(0);
        }
    }

    const handleDelete = async (event, id) => {
        event.preventDefault()
        event.stopPropagation();

        const databaseId = strategy.strategyid || strategy.strategyID || strategy.id;
        if (!databaseId) {
                    console.error("Cannot delete: Missing Strategy ID", strategy);
                    return;
                }

        if (window.confirm("Delete Entry?")) {
            try {
                await tradeService.remove(databaseId);

                setAllTrades(prevTrades => prevTrades.filter(t => 
                    (t.strategyid || t.strategyID || t.id) !== databaseId
                ));
              } 
              catch (err) {
                setError(err);
                console.error("Delete failed:", err);
              } 

        }
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        setEditModalOpen(true);
    }
    
    return (
        <>
            <tr onClick={handleClick} >
                <td>{firstLeg.symbol}</td>
                <td>{dateExec}</td>
                <td>{subActionData}</td>
                <td>{strategyName}</td>
                <td>{qty}</td>
                <td>
                    <div className={styles.price}>
                        <CombinePrice prices={prices} />
                    </div>
                </td>
                <td>
                    <CombineStrikes strikes={strikes} />
                </td>
                <td>{totalValue}</td>
                <td>{expdates}</td>
                <td>
                    <div className={styles.editButtons}>
                        <Button text="Edit"
                        backgroundColor={`var(--color-blue)`}
                        color={`var(--color-main)`}
                        handleClick={handleUpdate} />

                        <Button text="Del"
                        backgroundColor={`var(--color-red)`}
                        color={`var(--color-main)`}
                        handleClick={event => handleDelete(event, index)} />
                        {/* <Button text="del" backgroundColor={`var(--color-red)`} handleClick={() => handleDelete(person.id)} /> */}
                    </div>
                </td>
            </tr>
            {expand === 1 ?
                <ExpandRow stratName={stratName} strategy={strategy} />
                : null
            }
            <Modal open={editModalOpen}>
                <UpdateTradeForm 
                    handleClickClose={() => setEditModalOpen(false)}
                    setAllTrades={setAllTrades}
                    existingStrategy={strategy}
                />
            </Modal>
        </>
    )
}