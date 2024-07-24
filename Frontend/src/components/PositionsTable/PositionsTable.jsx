import { useState, useEffect } from 'react'
import styles from './PositionsTable.module.css'; 
import RemapData from './RemapData.jsx'
import { v4 as uuid } from 'uuid';
import Button from '../Button/Button.jsx'
import FormatTrade from './FormatTrade.jsx'
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

    // const tableHeader = {
    //     "Symbol": "symbol", 
    //     "Date": "dateExec",
    //     "Action": "action", 
    //     "Strategy": "posType", 
    //     "Qty": "quantity", 
    //     "Price": "stockPrice", 
    //     "Strike(s)": "strike",  
    //     "Value": "tradeValue", 
    //     "Exp. Date": "exp", 
    //     "Edit": "", 
    // }

    const tableHeader = [
        "Symbol", 
        "Date",
        "Action",
        "Strategy",
        "Qty",
        "Price",
        "Strikes",
        "Value",
        "Exp. Date",
        "Edit"
    ]

    const headers = Object.keys(tableHeader)
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
                    <AddTradeModal trades={trades} setTrades={setTrades} header={tableHeader} />
                </div>
                <hr/>
                <table>
                    <caption>All Positions</caption>
                    <thead>
                        <tr>
                            {tableHeader.map((element) => (
                                <th scope="col" key={element}>{element}</th>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <FormatTrade trades={trades} setTrades={setTrades} tableHeader={tableHeader} />
                    </tbody>
                </table>  
            </div>
        </>
    )
}