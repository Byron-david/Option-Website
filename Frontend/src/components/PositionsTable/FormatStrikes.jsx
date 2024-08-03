import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 

export default function FormatStrikes({ strikes }) {
    return (
        <>
            {strikes.map((strike, index) => {
                let addSlash = null
                let className = null

                if (index !== (strikes.length - 1)) {
                    addSlash = <span className={styles.slash} >{"/"}</span>
                }
                if (strike[strike.length - 1].toLowerCase() === "c") {
                    className = styles["callStrike"]
                }
                else {
                    className = styles["putStrike"]
                }
                return (
                    <>
                        <div className={className}>{strike}</div> {addSlash}
                    </>
                )
            })}
        </>
    )
}