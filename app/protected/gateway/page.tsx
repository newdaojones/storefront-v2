"use client"

// components/GatewaysPage.tsx
import GatewayHeader from '@/components/gateway/header';
import SupportedNetworks from '@/components/gateway/networks';
import GatewayPlugin from '@/components/gateway/plugin';
import TestNetwork from '@/components/gateway/testnet';
import SupportedTokens from '@/components/gateway/token';
import styles from '../../../components/gateway/gateway.module.css';

export default function GatewaysPage() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <GatewayHeader />
                <div className={styles.body}>
                    <div className={styles.rowContainer}>
                        <TestNetwork />
                        <SupportedTokens />
                        <SupportedNetworks />
                        <GatewayPlugin />
                    </div>
                </div>
            </div>
        </div>
    );
}
