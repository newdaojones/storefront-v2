"use client"

import ToggleNetworkAvax from '@/components/toggle-network-avax';
import ToggleNetworkEth from '@/components/toggle-network-eth';
import ToggleNetworkPolygon from '@/components/toggle-network-polygon';
import ToggleTestnet from '@/components/toggle-testnet';
import ToggleUSDCAvax from '@/components/toggle-usdc-avax';
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
                                <div className={styles.leftText}>Off</div>
                                <div className={styles.rightToggle}>
                                    <ToggleTestnet isChecked={false} onToggle={() => { }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.supportedTokens}>
                            <div className={styles.label}>Supported Tokens</div>
                            <div className={styles.boxToken}>
                                <div className={styles.leftText}>USDC</div>
                                <div className={styles.rightToggle}>
                                    <ToggleUSDCAvax isChecked={false} onToggle={() => { }} />
                                </div>
                            </div>
                        </div>
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
                        <div className={styles.gatewayPlugin}>
                            <div className={styles.label}>Gateway Plugin</div>
                            <div className={styles.boxGateway}>
                                <div className={styles.leftText}>Tip + Checkout Widget</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
