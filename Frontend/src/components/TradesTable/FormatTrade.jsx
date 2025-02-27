import { v4 as uuid } from 'uuid';
import styles from './TradesTable.module.css'; 
import TableRow from './TableRow'

export default function FormatTrade({ allTrades, setAllTrades, tableHeader }) {
    const strategyNames = allTrades.map(item => Object.keys(item)[0])

    return (
        <>
            {allTrades.map((trade, index) => {
                const stratName = strategyNames[index]

                return (
                    <TableRow stratName={stratName} trade={trade} key={uuid()} index={index} setAllTrades={setAllTrades} allTrades={allTrades} />
                )})}
        </>

    )
}