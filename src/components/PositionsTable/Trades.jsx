import { useState, useEffect } from 'react'
import styles from './PositionsTable.module.css'; 
import { v4 as uuid } from 'uuid';

const tableHeadNames = [
    "Symbol", 
    "Action", 
    "Type", 
    "Qty", 
    "Value", 
    "Strike",  
    "Exp. Date", 
    "Date",
    // "Time"
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



export default function Trades({ trades }) {
    const rows = trades.map(item => Object.values(item)[1])
    // row.map((option) => Object.values(option).map((value, index) => console.log(`${Object.keys(option)[index]}: ${value}`)))

    return (
        <>
            {rows.map((row) => {
                // console.log(Object.values(row.stock).map((option) => option.symbol)
                // console.log(Object.values(row.stock).map((option, index) => [option.symbol, index]))
                return (
                    <tr key={uuid()}>
                        {row.map((option) => Object.values(option).map((value, index) => (<td key={uuid()}>{Object.values(value)}</td>)))}
                    </tr>
                        // {Object.values(row.stock).map((option) => (<td key={uuid()}>{Object.values(option)}</td>) )}

                )   
                })
                // const strategyName = Object.keys(row)[1]
                // const strategy = row[strategyName]

                // if (Object.keys(row) !== "id") console.log(Object.keys(row)[1])

            }

            {/* {data.map((row) => (
                <tr key={uuid()}>
                    {Object.values(row).map((value) => (<td key={uuid()}>{value}</td>) )}
                </tr>
            ))} */}
        </>
    )
}