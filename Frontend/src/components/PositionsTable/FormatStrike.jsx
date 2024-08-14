import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import React, { Fragment } from "react"

export default function FormatStrike({ leg }) {
    if (!leg) {
        return null
    }
    let strikeClass
    let strike
    
    if (leg.trade_type[0].toLowerCase() === "c") {
        strikeClass = styles["callStrike"]
        strike = leg.strikes + 'C'
    }
    else if (leg.trade_type[0].toLowerCase() === "p"){
        strikeClass = styles["putStrike"]
        strike = leg.strikes + 'P'
    }
    return (
        <div className={strikeClass}>{strike}</div>
    )
}