// components/SupportedNetworks.tsx
import ToggleNetworkAvax from '@/components/toggles/toggle-network-avax';
import ToggleNetworkEth from '@/components/toggles/toggle-network-eth';
import ToggleNetworkPolygon from '@/components/toggles/toggle-network-polygon';
import styles from './gateway.module.css';

export default function SupportedNetworks() {
    return (
        <div className={styles.supportedNetworks}>
            <div className={styles.label}>Supported Networks</div>
            <div className={styles.boxNetwork}>
                <div className={styles.leftText}>Ethereum</div>
                <div className={styles.rightToggle}>
                    <ToggleNetworkEth isChecked={false} onToggle={() => { }} />
                </div>
                <div className={styles.leftText}>Polygon</div>
                <div className={styles.rightToggle}>
                    <ToggleNetworkPolygon isChecked={false} onToggle={() => { }} />
                </div>
                <div className={styles.leftText}>Avalanche</div>
                <div className={styles.rightToggle}>
                    <ToggleNetworkAvax isChecked={false} onToggle={() => { }} />
                </div>
            </div>
        </div>
    );
}
