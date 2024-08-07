import { v4 as uuid } from 'uuid';
import styles from './PositionsTable.module.css'; 

export default function AddSlash() {
    return (
        <span className={styles.AddSlash}>{" / "}</span>
    )
}