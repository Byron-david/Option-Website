import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import TableRow from './TableRow'

export default function FormatTrade({ allTrades, setAllTrades, tableHeader }) {

    const strategyNames = allTrades.map(item => Object.keys(item)[0])
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
            {allTrades.map((trade, index) => {
                const stratName = strategyNames[index]

                return (
                    <TableRow stratName={stratName} trade={trade} key={uuid()} index={index} setAllTrades={setAllTrades} allTrades={allTrades} />
                )})}
        </>

    )
}