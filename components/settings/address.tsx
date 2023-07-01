
// app/SettlementAddress.tsx
import styles from './settings.module.css';

interface SettlementAddressProps {
    params: { settlementAddress: Buffer };
}

const SettlementAddress: React.FC<SettlementAddressProps> = ({
    params: { settlementAddress },
}) => {


    return (
        <div className={styles.settlementAddress}>
            <div className={styles.label}>Settlement Address</div>
            <div className={styles.boxSettlementAddress}>0xdeedbeef</div>
        </div>
    );
};

export default SettlementAddress;