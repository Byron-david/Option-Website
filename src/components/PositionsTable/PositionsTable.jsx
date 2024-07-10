import { useState, useEffect } from 'react'
import styles from './PositionsTable.module.css'; 
import RemapData from './RemapData.jsx'
import { v4 as uuid } from 'uuid';
import Button from '../Button/Button.jsx'
import AddTradeModal from '../AddTrade/AddTradeModal.jsx';
import axios from 'axios'

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

const tableHeadNames = [
    "Symbol", 
    "Qty", 
    "Action", 
    "Type", 
    "Value", 
    "Strike",  
    "Exp. Date", 
    "Date",
    "Time"
  ];

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
    const [newTrade, setNewTrade] = useState([])
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
                    <AddTradeModal trades={trades} />
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
                        {trades.map((row) => (
                            console.log(row)
                            // <tr key={uuid()}>
                            //     {Object.values(row).map((value) => (<td key={uuid()}>{value}</td>) )}
                            // </tr>
                            ))
                        }
                        {/* {data.map((row) => (
                            <tr key={uuid()}>
                                {Object.values(row).map((value) => (<td key={uuid()}>{value}</td>) )}
                            </tr>
                        ))} */}
                    </tbody>
                </table>  
            </div>
        </>
    )
}