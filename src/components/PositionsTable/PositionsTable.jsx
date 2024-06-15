import { useState } from 'react'
import styles from './PositionsTable.module.css'; 
import RemapData from './RemapData.jsx'
import { v4 as uuid } from 'uuid';



export default function PositionsTable() {
    const [data, setData] = useState([]);
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
                                ))}
                                {/* {data.map((obj, index) => (
                                    <th scope="col" key={index}>{Object.keys(obj)}</th>
                                    ))} */}
                            </tr>
                            {/* <tr>
                                {data.map((name, index) => (
                                    <th scope="col" key={index}>{name}</th>
                                    ))}
                            </tr> */}
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={uuid()}>
                                    {Object.values(row).map((value) => (<td key={uuid()}>{value}</td>) )}
                                </tr>
                            ))}
                            {/* <tr>
                                {tableHeadNames.map((name, index) => (
                                    <td key={index}>{name}</td>
                                    ))}
                            </tr>
                            <tr>
                                {tableHeadNames.map((name, index) => (
                                    <td key={index}>{name}</td>
                                    ))}
                            </tr> */}
                        </tbody>
                    </table>  
            </div>
        </>
    )
}