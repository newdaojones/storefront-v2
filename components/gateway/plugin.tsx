// components/GatewayPlugin.tsx
import styles from './gateway.module.css';

export default function GatewayPlugin() {
    return (
        <div className={styles.gatewayPlugin}>
            <div className={styles.label}>Gateway Plugin</div>
            <div className={styles.boxGateway}>
                <div className={styles.leftText}>Tip + Checkout Widget</div>
            </div>
        </div>
    );
}
