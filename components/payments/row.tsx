import styles from './payments.module.css';

interface PaymentRowProps {
    payment: {
        id: number;
        total: number;
        status: string;
        code: string;
        timestamp: string;
    };
}

const PaymentRow: React.FC<PaymentRowProps> = ({ payment }) => {
    return (
        <div className={styles.paymentRow}>
            <div className={styles.paymentDetailRow}>
                <div className={styles.leftText}>Order ID: {payment.id}</div>
                <div className={styles.rightText}>Total: {payment.total}</div>
            </div>
            <div className={styles.paymentDetailRow}>
                <div className={styles.leftText}>Status: {payment.status}</div>
                <div className={styles.rightText}>Code: {payment.code}</div>
            </div>
            <div className={styles.paymentDetailRow}>
                <div className={styles.leftText}>Timestamp: {payment.timestamp}</div>
                <div className={styles.rightText}></div>
            </div>
        </div>
    );
};

export default PaymentRow;
