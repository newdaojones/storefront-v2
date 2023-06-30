"use client"
// components/CreateOrder.tsx
import OrderAmount from '@/components/order/amount';
import Buttons from '@/components/order/cancel-submit';
import CustomerEmail from '@/components/order/email';
import OrderHeader from '@/components/order/header';
import CustomerNumber from '@/components/order/number';
import { useState } from 'react';
import styles from '../../../components/order/order.module.css';

export default function CreateOrder() {
    const [order, setOrder] = useState({ amount: '', email: '', phoneNumber: '' });

    const isOrderValid = () => {
        return order.amount !== '' && order.email !== '' && order.phoneNumber !== '';
    };

    const handleSubmit = async () => {
        if (!isOrderValid()) return;

        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }

        setOrder({ amount: '', email: '', phoneNumber: '' });
    };

    const handleCancel = () => {
        setOrder({ amount: '', email: '', phoneNumber: '' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <OrderHeader />
                <div className={styles.body}>
                    <div className={styles.rowContainer}>
                        <OrderAmount amount={order.amount} setAmount={(amount) => setOrder({ ...order, amount })} />
                        <CustomerNumber phoneNumber={order.phoneNumber} setPhoneNumber={(phoneNumber) => setOrder({ ...order, phoneNumber })} />
                        <CustomerEmail email={order.email} setEmail={(email) => setOrder({ ...order, email })} />
                    </div>
                    <Buttons onSubmit={handleSubmit} onCancel={handleCancel} isOrderValid={isOrderValid()} />
                </div>
            </div>
        </div>
    );
}
