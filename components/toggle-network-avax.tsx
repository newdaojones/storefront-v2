"use client"
//components/toggle-testnet.tsx

import { useState } from 'react';
import styles from './toggle.module.css';

interface ToggleNetworkAvaxProps {
    isChecked: boolean;
    onToggle: () => void;
}

const ToggleNetworkAvax: React.FC<ToggleNetworkAvaxProps> = ({ isChecked: initialIsChecked, onToggle }) => {
    const [isChecked, setIsChecked] = useState(initialIsChecked);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        onToggle();
    }

    return (
        <div className={styles.toggle}>
            <input type="checkbox" className={styles.toggleCheckbox} checked={isChecked} onChange={handleToggle} />
            <div className={styles.toggleKnob}></div>
            <div className={`${styles.toggleText} ${styles.on}`}>ON</div>
            <div className={`${styles.toggleText} ${styles.off}`}>OFF</div>
        </div>
    );
};

export default ToggleNetworkAvax;


