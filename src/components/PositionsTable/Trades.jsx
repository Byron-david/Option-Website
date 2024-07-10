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



export default function Trades({ trades }) {


    return (
        <>
            {trades.map((row) => {
                // console.log(Object.values(row.stock).map((option) => option.symbol)
                console.log(Object.values(row.stock).map((option, index) => [option.symbol, index]))
                return (
                    <tr key={uuid()}>
                        {Object.values(row.stock).map((option) => (<td key={uuid()}>{Object.values(option)}</td>) )}
                    </tr>
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