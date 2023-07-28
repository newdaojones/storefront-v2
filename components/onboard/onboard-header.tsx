// app/onboard/OnboardHeader.tsx
import styles from './onboard.module.css';

export default function OnboardHeader({ title }: { title: string }) {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
        </div>
    );
}

