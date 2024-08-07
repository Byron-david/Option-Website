import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import React, { Fragment } from "react"

export default function FormatStrike({ leg }) {
    let strikeClass
    let strike
    
    if (leg.tradetype[0].toLowerCase() === "c") {
        strikeClass = styles["callStrike"]
        strike = leg.strikes + 'C'
    }
    else {
        strikeClass = styles["putStrike"]
        strike = leg.strikes + 'P'
    }
    return (
        <div className={strikeClass}>{strike}</div>
    )
}