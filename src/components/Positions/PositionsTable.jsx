import { useState } from 'react'

export default function PositionsTable() {
    let tableHeadNames = ["Symbol", "Action", "Qty", "Call/Put", "Value", "Strike",  "Exp. Date", "Date", "Open/Close"];

    return (
        <>
            <div id="tableTemplate">
                <table>
                        <thead>
                            <tr>
                                {tableHeadNames.map((name, index) => (
                                    <th key={index}>{name}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
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