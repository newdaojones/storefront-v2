import CustomerDetails, { CustDetails } from './details-customer';
import PaymentDetails, { Payment } from './details-payment';
import StatusDetails, { ResponseCodes } from './details-status';
import styles from './payments.module.css';

type PaymentItemProps = {
    payment: Payment;
    customer: CustDetails;
    status: ResponseCodes;
    isExpanded: boolean;
    onClick: () => void;
};



const PaymentItem: React.FC<PaymentItemProps> = ({ payment, customer, status, isExpanded, onClick }) => {
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
            {isExpanded && <CustomerDetails customer={customer} />}
            {isExpanded && <PaymentDetails payment={payment} />}
            {isExpanded && <StatusDetails status={status} />}
        </div>
    );
};

export default PaymentItem;

