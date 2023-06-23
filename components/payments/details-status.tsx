// Import React and styles
import React from 'react';
import styles from './payments.module.css';

// Import the type for Payment

export type ResponseCodes = {
    authentication: string;
    authorization: string;
    captured: string;
    status: string;
    dispute: string;
};

interface StatusDetailsProps {
    status: ResponseCodes;
}

const StatusDetails: React.FC<StatusDetailsProps> = ({ status }) => {
    return (
        <div className={styles.expandedDetails}>
            <div className={styles.leftText}>Authentication:</div>
            <div className={styles.rightText}>{status.authentication}</div>
            <div className={styles.leftText}>Authorization:</div>
            <div className={styles.rightText}>{status.authorization}</div>
            <div className={styles.leftText}>Captured:</div>
            <div className={styles.rightText}>{status.captured}</div>
            <div className={styles.leftText}>Status:</div>
            <div className={styles.rightText}>{status.status}</div>
            <div className={styles.leftText}>Dispute:</div>
            <div className={styles.rightText}>{status.dispute}</div>
        </div>
    );
}

export default StatusDetails;
