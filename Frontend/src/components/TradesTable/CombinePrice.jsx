import { v4 as uuid } from 'uuid';
import styles from './TradesTable.module.css'; 
import AddSlash from './AddSlash.jsx'
import React, { Fragment } from "react"
import FormatPrice from './FormatPrice.jsx'

export default function CombinePrice({ prices }) {
    return (
        <>
            {prices.map((price, index) => {
                return (
                    <Fragment key={uuid()}>
                        <FormatPrice price={price} />
                        {index !== (prices.length - 1) ? <AddSlash />: null}
                    </Fragment >
                )
            })}
        </>
    )
}