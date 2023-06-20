"use client"

// components/CustomerEmail.tsx
import { useState } from 'react';
import styles from './order.module.css';

export default function CustomerEmail() {
    const [email, setEmail] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className={styles.customerEmail}>
            <div className={styles.label}>Customer Email</div>
            <div className={styles.boxCustomerEmail}>
                <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
        </div>
    );
}
