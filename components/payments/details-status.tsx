// Import React and styles
import React from 'react';
import styles from './payments.module.css';
import { Order } from '@prisma/client';


interface StatusDetailsProps {
    order: Order;
}

const StatusDetails: React.FC<StatusDetailsProps> = ({ order }) => {
    return (
        <div className={styles.expandedDetails}>
            <div className={styles.leftText}>Charge Id:</div>
            <div className={styles.rightText}>{order.chargeId}</div>
            <div className={styles.leftText}>Last 4:</div>
            <div className={styles.rightText}>{order.last4}</div>
            <div className={styles.leftText}>Authorization:</div>
            <div className={styles.rightText}>{order.chargeCode}</div>
            <div className={styles.leftText}>Message:</div>
            <div className={styles.rightText}>{order.chargeMsg}</div>
            <div className={styles.leftText}>Status:</div>
            <div className={styles.rightText}>{order.chargeStatus}</div>
        </div>
    );
}

export default StatusDetails;
