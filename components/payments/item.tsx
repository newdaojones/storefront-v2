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
                className={styles.paymentRow}
                onClick={onClick}
            >
                <div>{payment.orderId}</div>
                <div>{total}</div>
                <div>{payment.status}</div>
                <div>{payment.responseCode}</div>
                <div>{payment.createdAt}</div>
            </div>
            {isExpanded && (
                <div className={styles.expandedDetails}>
                    <div className={styles.leftText}>Name:</div>
                    <div className={styles.rightText}>{payment.orderAmount}</div>
                    <div className={styles.leftText}>Email:</div>
                    <div className={styles.rightText}>{payment.tip}</div>
                    <div className={styles.leftText}>Phone:</div>
                    <div className={styles.rightText}>{payment.networkFee}</div>
                    <div className={styles.leftText}>Records:</div>
                    <div className={styles.rightText}>{payment.serviceFee}</div>
                    <div className={styles.leftText}>LTV:</div>
                    <div className={styles.rightText}>{payment.tax}</div>
                </div>
            )}
            {isExpanded && (
                <div className={styles.expandedDetails}>
                    <div className={styles.leftText}>Amount:</div>
                    <div className={styles.rightText}>{payment.orderAmount}</div>
                    <div className={styles.leftText}>Tip:</div>
                    <div className={styles.rightText}>{payment.tip}</div>
                    <div className={styles.leftText}>Network:</div>
                    <div className={styles.rightText}>{payment.networkFee}</div>
                    <div className={styles.leftText}>Service:</div>
                    <div className={styles.rightText}>{payment.serviceFee}</div>
                    <div className={styles.leftText}>Tax:</div>
                    <div className={styles.rightText}>{payment.tax}</div>
                </div>
            )}
            {isExpanded && (
                <div className={styles.expandedDetails}>
                    <div className={styles.leftText}>Authentication:</div>
                    <div className={styles.rightText}>{payment.orderAmount}</div>
                    <div className={styles.leftText}>Authorization:</div>
                    <div className={styles.rightText}>{payment.tip}</div>
                    <div className={styles.leftText}>Captured:</div>
                    <div className={styles.rightText}>{payment.networkFee}</div>
                    <div className={styles.leftText}>Status:</div>
                    <div className={styles.rightText}>{payment.serviceFee}</div>
                    <div className={styles.leftText}>Dispute:</div>
                    <div className={styles.rightText}>{payment.tax}</div>
                </div>
            )}
        </div>
    );
};


export default PaymentItem;
