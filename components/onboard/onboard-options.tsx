"use client"

// app/onboard/OnboardOptions.tsx
import { useRouter } from 'next/navigation';
import styles from './onboard.module.css';

export default function OnboardOptions() {
    const router = useRouter();

    const handleDemoClick = () => {
        router.push('https://test.storefrontpay.app/merchant'); // replace '/demo' with your demo route
    };

    const handleOnboardClick = () => {
        router.push('/protected/onboard/kyc'); // replace '/onboard' with your onboard route
    };

    return (
        <div className={styles.options}>
            <button className={styles.button} onClick={handleDemoClick}>Demo</button>
            <button className={styles.button} onClick={handleOnboardClick}>Onboard</button>
        </div>
    );
}
