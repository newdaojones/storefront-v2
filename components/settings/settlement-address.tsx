
import styles from './settings.module.css';


export default function SettlementAddress() {
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.title}>Settlement Address</div>
            </div>
            <div className={styles.body}>
                <div className={styles.rowContainer}>
                    <div className={styles.settlementAddress}>
                        <div className={styles.label}>Settlement Address</div>
                        <div className={styles.boxSettlement}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}