import styles from './TradesTable.module.css'; 
import AddSlash from './AddSlash'
import React, { Fragment } from "react"

export default function CombineStrikes({ strikes }) {
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
                    <Fragment key={index}>
                        <div className={className}>{strike}</div>
                    </Fragment >
                )
            })}
        </>
    )
}