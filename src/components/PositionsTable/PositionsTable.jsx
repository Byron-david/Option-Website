import { useState } from 'react'
import styles from './PositionsTable.module.css'; 

export default function PositionsTable() {
    let tableHeadNames = ["Symbol", "Action", "Qty", "Call/Put", "Value", "Strike",  "Exp. Date", "Date", "Open/Close", "Edit/Remove"];

    return (
        <>
            <div className={styles.tableTemplate}>
                <table>
                        <thead>
                            <tr>
                                {tableHeadNames.map((name, index) => (
                                    <th scope="col" key={index}>{name}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {tableHeadNames.map((name, index) => (
                                    <td key={index}>{name}</td>
                                    ))}
                            </tr>
                            <tr>
                                {tableHeadNames.map((name, index) => (
                                    <td key={index}>{name}</td>
                                    ))}
                            </tr>
                        </tbody>
                    </table>  
            </div>
        </>
    )
}