// components/TestNetwork.tsx
import ToggleTestnet from '@/components/toggles/toggle-testnet';
import styles from './gateway.module.css';

export default function TestNetwork() {
    return (
        <div className={styles.testNetwork}>
            <div className={styles.label}>Test Network</div>
            <div className={styles.boxTest}>
                <div className={styles.leftText}>Off</div>
                <div className={styles.rightToggle}>
                    <ToggleTestnet isChecked={false} onToggle={() => { }} />
                </div>
            </div>
        </div>
    );
}
