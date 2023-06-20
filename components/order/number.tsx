// components/CustomerNumber.tsx
import { useState } from 'react';
import styles from './order.module.css';

export default function CustomerNumber() {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    return (
        <div className={styles.customerNumber}>
            <div className={styles.label}>Customer Number</div>
            <div className={styles.boxCustomerNumber}>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
        </div>
    );
}
