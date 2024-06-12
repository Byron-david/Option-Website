import { useState } from 'react'
import styles from './PositionsTable.module.css'; 
import RemapData from '../RemapData.jsx'
import { v4 as uuid } from 'uuid';



export default function PositionsTable() {
    const [data, setData] = useState([]);
    const [header, setHeader] = useState([]);
    const handleFileLoad = (csvData) => {
      setData(csvData);
      setHeader(Object.keys(csvData[0]));
    //   setBody(Object.keys(csvData[0]));
    }

    // const handleClick = () => console.log(Object.values(data[0]));

    // const mapData = (data) => {
    //     const mappedResult = data.map((option) => ({ date: option["Date"] }));
    // }

    return (
        <>
            <div className={styles.tableTemplate}>
                <RemapData onFileLoad={handleFileLoad} />
                {/* <button onClick={handleClick}></button> */}
                <table>
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