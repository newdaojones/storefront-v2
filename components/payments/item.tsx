import styles from './payments.module.css';

type Payment = {
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

type PaymentItemProps = {
    payment: Payment;
    isExpanded: boolean;
    onClick: () => void;
};

const PaymentItem: React.FC<PaymentItemProps> = ({ payment, isExpanded, onClick }) => {
    const total = payment.orderAmount + payment.tip + payment.networkFee + payment.serviceFee + payment.tax;

    return (
        <div
            className={isExpanded ? `${styles.boxOrderId} ${styles.expandedItem}` : styles.boxOrderId}
            onClick={onClick}
        >
            <div className={styles.label}>Order ID</div>
            <div>{payment.orderId}</div>
            <div className={styles.label}>Total</div>
            <div>{total}</div>
            <div className={styles.label}>Status</div>
            <div>{payment.status}</div>
            <div className={styles.label}>Response Code</div>
            <div>{payment.responseCode}</div>
            <div className={styles.label}>Timestamp</div>
            <div>{payment.createdAt}</div>
            {isExpanded && (
                <div>
                    <div className={styles.label}>Amount:</div>
                    <div className={styles.value}>{payment.orderAmount}</div>
                    <div className={styles.label}>Tip:</div>
                    <div className={styles.value}>{payment.tip}</div>
                    <div className={styles.label}>Network Fee:</div>
                    <div className={styles.value}>{payment.networkFee}</div>
                    <div className={styles.label}>Service Fee:</div>
                    <div className={styles.value}>{payment.serviceFee}</div>
                    <div className={styles.label}>Tax:</div>
                    <div className={styles.value}>{payment.tax}</div>
                </div>
            )}
        </div>
    );
};

export default PaymentItem;
