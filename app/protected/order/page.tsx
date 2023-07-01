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
    const [order, setOrder] = useState({ orderAmount: '', guestEmail: '', guestPhone: '' });

    const isOrderValid = () => {
        return order.orderAmount !== '' && order.guestEmail !== '' && order.guestPhone !== '';
    };

    const handleSubmit = async () => {
        if (!isOrderValid()) return;

        const response = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }

        setOrder({ orderAmount: '', guestEmail: '', guestPhone: '' });
    };

    const handleCancel = () => {
        setOrder({ orderAmount: '', guestEmail: '', guestPhone: '' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <OrderHeader />
                <div className={styles.body}>
                    <div className={styles.rowContainer}>
                        <OrderAmount amount={order.orderAmount} setAmount={(amount) => setOrder({ ...order, orderAmount: amount })} />
                        <CustomerNumber phoneNumber={order.guestPhone} setPhoneNumber={(phoneNumber) => setOrder({ ...order, guestPhone: phoneNumber })} />
                        <CustomerEmail email={order.guestEmail} setEmail={(email) => setOrder({ ...order, guestEmail: email })} />
                    </div>
                    <Buttons onSubmit={handleSubmit} onCancel={handleCancel} isOrderValid={isOrderValid()} />
                </div>
            </div>
        </div>
    );
}
