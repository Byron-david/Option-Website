import { useState } from 'react'
import styles from './PositionsTable.module.css'; 
import RemapData from './RemapData.jsx'
import { v4 as uuid } from 'uuid';
import Button from '../Button.jsx'

function Trades(tradeData) {
    // get trade data

    // remove time or other columns

    // Combine individual trades to strategies
    const trades = tradeData;

    // loop through array
    
}

function RowButtons() {
    return (
        <div>
            <Button />
            <Button />
        </div>
    )
}

export default function PositionsTable() {
    const [data, setData] = useState([]);
    const [importData, setImportData] = useState([]);
    const [trades, setTrades] = useState([]);
    const [header, setHeader] = useState([]);

    const handleFileLoad = (csvData) => {
      setData(csvData);
      let newHeader = Object.keys(csvData[0]);
      setHeader(newHeader);
    }

    return (
        <>
            <div className={styles.tableTools}>
                <RemapData onFileLoad={handleFileLoad} />
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <caption>All Positions</caption>
                        <thead>
                            <tr>
                                {header.map((element) => (
                                    <th scope="col" key={element}>{element}</th>
                                ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={uuid()}>
                                    {Object.values(row).map((value) => (<td key={uuid()}>{value}</td>) )}
                                    {/* <RowButtons /> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>  
            </div>
        </>
    )
}