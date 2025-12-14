import { v4 as uuid } from 'uuid';
import styles from './TradesTable.module.css'; 
import TableRow from './TableRow'

export default function FormatTrade({ allTrades, setAllTrades, tableHeader, onEdit }) {
    const strategyNames = allTrades.map(item => Object.values(item)[1])

    return (
        <>
            {allTrades.map((strategy, index) => {
                const stratName = strategyNames[index]
                const rowKey = strategy.strategyid || strategy.strategyID || strategy.id || index;

                return (
                    <TableRow 
                        stratName={stratName} 
                        strategy={strategy} 
                        key={rowKey}
                        index={index} 
                        setAllTrades={setAllTrades} 
                        allTrades={allTrades} 
                        onEdit={onEdit}
                    />
                )})}
        </>

    )
}