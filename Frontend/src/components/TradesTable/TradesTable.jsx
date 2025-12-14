import { useState, useEffect } from 'react'
import styles from './TradesTable.module.css'; 
import RemapData from './RemapData.jsx'
import { v4 as uuid } from 'uuid';
import Button from '../Button/Button.jsx'
import FormatTrade from './FormatTrade.jsx'
import AddTradeModal from '../AddTrade/AddTradeModal.jsx';
import UpdateTradeForm from '../AddTrade/UpdateTradeForm.jsx';
import Modal from '../Modal/Modal.jsx';
import tradeService from '../../services/trades.js'

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
            <tr key={index}> 
                {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                ))}
            </tr>
        ))
    )
}

export default function TradesTable({ data }) {
    const [isLoading, setIsLoading] = useState(null);
    const [allTrades, setAllTrades] = useState([])
    const [editingTrade, setEditingTrade] = useState(null);

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

    useEffect(() => {
        const fetchDataAsync = async () => {
          setIsLoading(true);
          try {
            const fetchedData = await tradeService.fetchData();
            setAllTrades(fetchedData);
    
          } catch (err) {
            setError(err);
          } 
          finally {
            setIsLoading(false);
          }
        };
    
        fetchDataAsync();
      }, []);

    const handleEditClick = (trade) => {
        setEditingTrade(trade);
    };

    const closeEditModal = () => {
        setEditingTrade(null);
    };

    // useEffect(() => {
    //     tradeService
    //       .getAll()
    //       .then(initialTrades => {
    //         // const addExpand = initialTrades.map(trade => ( {...trade, "expand": 0 }))
    //         setAllTrades(initialTrades)
    //       })
    //   }, [])

    // const handleFileLoad = (csvData) => {
    //   setData(csvData);
    //   let newHeader = Object.keys(csvData[0]);
    //   setHeader(newHeader);
    // }

    return (
        <> 
            {isLoading ? 
            <div>
                Loading...
            </div>
            :
            <div className={styles.tableContainer}>
                <div className={styles.tableTools}>
                    {/* <RemapData onFileLoad={handleFileLoad} /> */}
                    <AddTradeModal allTrades={allTrades} setAllTrades={setAllTrades} header={tableHeader} />
                </div>

                {editingTrade && (
                    <Modal open={true}>
                        <UpdateTradeForm 
                            currentTrade={editingTrade}
                            setAllTrades={setAllTrades}
                            handleClickClose={closeEditModal}
                        />
                    </Modal>
                )}

                <hr/>
                <table>
                    <caption>All Trades</caption>
                    <thead>
                        <tr>
                            {tableHeader.map((element) => (
                                <th scope="col" key={element}>{element}</th>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <FormatTrade 
                            allTrades={allTrades}
                            setAllTrades={setAllTrades}
                            onEdit={handleEditClick} />
                    </tbody>
                </table>  
            </div>
            }
        </>
    )
}