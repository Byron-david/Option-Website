import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import TableRow from './TableRow'

export default function FormatTrade({ trades, setTrades, tableHeader }) {

    const strategyNames = trades.map(item => Object.keys(item)[0])
    const keys = tableHeader.map(key =>  { 
        let lowerKey = key.toLowerCase()
        if (key === "Exp. Date") {
          lowerKey = key.split(". ")
          lowerKey = lowerKey.join("")
          lowerKey = lowerKey.toLowerCase()
        }
        return (lowerKey)
      })

    return (
        <>
            {trades.map((trade, index) => {
                const stratName = strategyNames[index]

                return (
                    <TableRow stratName={stratName} trade={trade} key={uuid()} />
                )})}
        </>

    )
}