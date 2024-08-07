import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 
import AddSlash from './AddSlash'
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