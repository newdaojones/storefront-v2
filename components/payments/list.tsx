"use client"

import { Order } from '@prisma/client';
import { useState } from 'react';
import PaymentItem from './item';
import styles from './payments.module.css';

export type Payment = {
    paymentId: string;
    orderAmount: number;
    orderId: string;
    tip: number;
    networkFee: number;
    serviceFee: number;
    tax: number;
    txHash: string;
    status: string;
    responseCode: number;
    createdAt: string;
    cancelledAt?: string;
};

export default function PaymentList({ orders }: { orders: Array<Order> }) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <div className={styles.rowContainer}>
            <div className={styles.rowHeader}>
                <div className={styles.headerCell}>Order ID</div>
                <div className={styles.headerCell}>Total</div>
                <div className={styles.headerCell}>Status</div>
                <div className={styles.headerCell}>Timestamp</div>
            </div>
            <div className={styles.rowContainer}>
                {orders.map((order, index) => (
                    <PaymentItem
                        key={order.id}
                        order={order}
                        isExpanded={expandedIndex === index}
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)} />
                ))}
            </div>
        </div>
    );
}
