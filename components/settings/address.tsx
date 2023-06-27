
// app/SettlementAddress.tsx
import { useEffect, useState } from 'react';
import { fetchSettlementAddress } from '../../app/api/[merchant]/route';
import styles from './settings.module.css';

interface SettlementAddressProps {
    params: { settlementAddress: Buffer };
}

const SettlementAddress: React.FC<SettlementAddressProps> = ({
    params: { settlementAddress },
}) => {
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchSettlementAddress(settlementAddress);
            setAddress(data?.toString() || null);
        }

        fetchData();
    }, [settlementAddress]);

    return (
        <div className={styles.settlementAddress}>
            <div className={styles.label}>Settlement Address</div>
            <div className={styles.boxSettlementAddress}>{address}</div>
        </div>
    );
};

export default SettlementAddress;