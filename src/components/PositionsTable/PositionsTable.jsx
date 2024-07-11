import { useState, useEffect } from 'react'
import styles from './PositionsTable.module.css'; 
import RemapData from './RemapData.jsx'
import { v4 as uuid } from 'uuid';
import Button from '../Button/Button.jsx'
import Trades from './Trades.jsx'
import AddTradeModal from '../AddTrade/AddTradeModal.jsx';
import axios from 'axios'

function RowButtons() {
    return (
        <div>
            <Button />
            <Button />
        </div>
    )
}

const tableHeadNames = [
    "Symbol", 
    "Action", 
    "Type", 
    "Qty", 
    "Value", 
    "Strike",  
    "Exp. Date", 
    "Date",
    "Time"
  ];

//   const defaultTrade = [
//     symbol,
//     strike,
//     action,
//     posType,
//     tradeValue,
//     expDate,
//     quantity,
//     dateExec
//   ]

const MapRows = ({data}) => {

    return (
        data.map((row) => (
            <tr key={uuid()}>
                {Object.values(row).map((value) => (<td key={uuid()}>{value}</td>) )}
            </tr>
        ))
    )
}

export default function PositionsTable({ data }) {
    // const [data, setData] = useState([]);
    // const [importData, setImportData] = useState([]);
    const [header, setHeader] = useState([]);
    const [trades, setTrades] = useState([])
  
    useEffect(() => {
      axios
        .get('http://localhost:3001/trades')
        .then(response => {
          setTrades(response.data)
        })
    }, [])
    // const handleFileLoad = (csvData) => {
    //   setData(csvData);
    //   let newHeader = Object.keys(csvData[0]);
    //   setHeader(newHeader);
    // }

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.tableTools}>
                    {/* <RemapData onFileLoad={handleFileLoad} /> */}
                    <AddTradeModal trades={trades} setTrades={setTrades} />
                </div>
                <hr/>
                <table>
                    <caption>All Positions</caption>
                    <thead>
                        <tr>
                            {tableHeadNames.map((element) => (
                                <th scope="col" key={element}>{element}</th>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* <Trades trades={trades} /> */}
                    </tbody>
                </table>  
            </div>
        </>
    )
}