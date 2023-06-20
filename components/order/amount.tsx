"use client"

// components/OrderAmount.tsx
import { useState } from 'react';
import styles from './order.module.css';

export default function OrderAmount() {
    const [amount, setAmount] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    return (
        <div className={styles.orderAmount}>
            <div className={styles.label}>Order Amount</div>
            <div className={styles.boxOrderAmount}>
                <input
                    type="number"
                    value={amount}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
        </div>
    );
}
