// Import React and styles
import React from 'react';
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

interface PaymentDetailsProps {
    payment: Payment;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payment }) => {
    return (
        <div className={styles.expandedDetails}>
            <div className={styles.leftText}>Subtotal:</div>
            <div className={styles.rightText}>{payment.orderAmount}</div>
            <div className={styles.leftText}>Tip:</div>
            <div className={styles.rightText}>{payment.tip}</div>
            <div className={styles.leftText}>Network Fee:</div>
            <div className={styles.rightText}>{payment.networkFee}</div>
            <div className={styles.leftText}>Service Fee:</div>
            <div className={styles.rightText}>{payment.serviceFee}</div>
            <div className={styles.leftText}>Tax:</div>
            <div className={styles.rightText}>{payment.tax}</div>
        </div>
    );
}

export default PaymentDetails;
