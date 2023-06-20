import styles from './gateways.module.css';

export default function GatewaysPage() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>Re Up | Gateway</div>
                </div>
                <div className={styles.body}>
                    <div className={styles.rowContainer}>
                        <div className={styles.testNetwork}>
                            <div className={styles.label}>Test Network</div>
                            <div className={styles.boxTest}>
                                <div className={styles.leftText}>Box</div>
                                <div className={styles.rightToggle}>Toggle</div>
                            </div>
                        </div>
                        <div className={styles.supportedTokens}>
                            <div className={styles.label}>Supported Tokens Label</div>
                            <div className={styles.boxToken}>
                                <div className={styles.leftText}>Box Label</div>
                                <div className={styles.rightToggle}>Toggle switch</div>
                            </div>
                        </div>
                        <div className={styles.supportedNetworks}>
                            <div className={styles.label}>Supported Networks Label</div>
                            <div className={styles.boxNetwork}>
                                <div className={styles.leftText}>Box Label</div>
                                <div className={styles.rightToggle}>Toggle switch</div>
                            </div>
                        </div>
                        <div className={styles.gatewayPlugin}>
                            <div className={styles.label}>Gateway Plugin Label</div>
                            <div className={styles.boxGateway}>
                                <div className={styles.leftText}>Box Label</div>
                                <div className={styles.rightToggle}>Toggle switch</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
