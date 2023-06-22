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
        <div className={styles.rowContainer}>
            <div
                className={isExpanded ? `${styles.boxOrderId} ${styles.paymentDetailRow}` : styles.paymentRow}
                onClick={onClick}
            >
                <div>{payment.orderId}</div>
                <div>{total}</div>
                <div>{payment.status}</div>
                <div>{payment.responseCode}</div>
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
        </div>
    );
};

export default PaymentItem;
