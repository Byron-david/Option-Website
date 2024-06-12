import { useState } from 'react'
import styles from './PositionsTable.module.css'; 
import RemapData from '../RemapData.jsx'
import { v4 as uuid } from 'uuid';



export default function PositionsTable() {
    const [data, setData] = useState([]);
    const handleFileLoad = (csvData) => {
      setData(csvData);
    }

    const mapData = (data) => {
        const mappedResult = data.map((option) => ({ date: option["Date"] }));
    }

    return (
        <>
            <div className={styles.tableTemplate}>
                <RemapData onFileLoad={handleFileLoad} />
                <table>
                        <thead>
                            {/* <tr>
                                {data.map((name, index) => (
                                    <th scope="col" key={index}>{name}</th>
                                    ))}
                            </tr> */}
                            {/* <tr>
                                {data.map((name, index) => (
                                    <th scope="col" key={index}>{name}</th>
                                    ))}
                            </tr> */}
                        </thead>
                        <tbody>
                            {/* {data.map((row, index) => (
                                <tr key={uuid()}>
                                    <td key={index}>{row}</td>
                                </tr>
                            ))} */}
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