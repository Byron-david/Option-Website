import { v4 as uuid } from 'uuid';
import styles from './TradesTable.module.css'; 
import AddSlash from './AddSlash'
import React, { Fragment } from "react"

export default function FormatPrice({ price }) {
    let className = null

    if (price[0] === '-') {
        className = styles["debit"]
    }
    else {
        className = styles["credit"]
    }
    
    return (
        <span className={className}>{price}</span>
    )
}