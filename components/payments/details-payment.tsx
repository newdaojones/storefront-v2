// Import React and styles
import React from 'react';
import styles from './payments.module.css';
import { Order } from '@prisma/client';

interface PaymentDetailsProps {
    order: Order;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ order }) => {
    return (
        <div className={styles.expandedDetails}>
            <div className={styles.leftText}>Subtotal:</div>
            <div className={styles.rightText}>{order.amount}</div>
            <div className={styles.leftText}>Tip:</div>
            <div className={styles.rightText}>{order.tipAmount}</div>
            <div className={styles.leftText}>Network Fee:</div>
            <div className={styles.rightText}>{order.networkFee}</div>
            <div className={styles.leftText}>Service Fee:</div>
            <div className={styles.rightText}>{order.serviceFee}</div>
            <div className={styles.leftText}>Tax:</div>
            <div className={styles.rightText}>{order.taxFee}</div>
        </div>
    );
}

export default PaymentDetails;
