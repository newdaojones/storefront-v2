// app/onboard/OnboardPage.tsx
import OnboardHeader from '../../../components/onboard/onboard-header';
import OnboardOptions from '../../../components/onboard/onboard-options';
import styles from '../../../components/onboard/onboard.module.css';

export default function Onboard() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <OnboardHeader title="Welcome to Storefront" />
                <div className={styles.body}>
                    <p className={styles.intro}>
                        Welcome to Storefront, you&apos;re currently a guest of the system. If you&apos;d like to take Storefront for a spin before onboarding as a merchant, feel free to try out our test site by following Demo. If you&apos;re ready to get started hit Onboard to begin KYC for your project
                    </p>
                    <OnboardOptions />
                </div>
            </div>
        </div>
    );
}
