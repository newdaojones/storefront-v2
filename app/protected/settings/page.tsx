"use client"
// This has buttons which will be taking clicks from users and doing state things with them

// components/SettingsPage.tsx
import SettlementAddress from '@/components/settings/address';
import SettingsHeader from '@/components/settings/header';
import KYCStatus from '@/components/settings/kyc';
import MerchantUsername from '@/components/settings/username';
import AppVersion from '@/components/settings/version';
import styles from '../../../components/settings/settings.module.css';

export default function SettingsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <SettingsHeader />
                <div className={styles.body}>
                    <div className={styles.rowContainer}>
                        <SettlementAddress />
                        <MerchantUsername />
                        <KYCStatus />
                        <AppVersion />
                        <div className={styles.boxButton}>
                            <button className={styles.button}>Cancel</button>
                            <button className={styles.button}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
