"use client"

// components/CreateOrder.tsx
import OrderAmount from '@/components/order/amount';
import CustomerEmail from '@/components/order/email';
import OrderHeader from '@/components/order/header';
import CustomerNumber from '@/components/order/number';
import styles from '../../../components/order/order.module.css';

export default function CreateOrder() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <OrderHeader />
                <div className={styles.body}>
                    <div className={styles.rowContainer}>
                        <OrderAmount />
                        <CustomerNumber />
                        <CustomerEmail />
                    </div>
                </div>
            </div>
        </div>
    );
}
