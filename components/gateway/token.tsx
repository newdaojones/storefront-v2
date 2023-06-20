// components/SupportedTokens.tsx
import ToggleUSDCAvax from '@/components/toggles/toggle-usdc-avax';
import styles from './gateway.module.css';

export default function SupportedTokens() {
    return (
        <div className={styles.supportedTokens}>
            <div className={styles.label}>Supported Tokens</div>
            <div className={styles.boxToken}>
                <div className={styles.leftText}>USDC</div>
                <div className={styles.rightToggle}>
                    <ToggleUSDCAvax isChecked={false} onToggle={() => { }} />
                </div>
            </div>
        </div>
    );
}
