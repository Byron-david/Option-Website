import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import React, { Fragment } from "react"

export default function FormatStrike({ strikes }) {
    let strikeClass
    
    if (leg.tradetype[0].toLowerCase() === "c") {
        strikeClass = styles["callStrike"]
        strike = leg.strikes + 'C'
    }
    else {
        strikeClass = styles["putStrike"]
        strike = leg.strikes + 'P'
    }
    return (
        <>
            {strikes.map((strike, index) => {
                let addSlash = null
                let className = null

                if (strike[strike.length - 1].toLowerCase() === "c") {
                    className = styles["callStrike"]
                }
                else {
                    className = styles["putStrike"]
                }
                return (
                    <div className={className}>{strike}</div>
                )
            })}
        </>
    )
}