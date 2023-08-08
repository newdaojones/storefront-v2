import { Order } from '@prisma/client';
import CustomerDetails, { CustDetails } from './details-customer';
import PaymentDetails, { Payment } from './details-payment';
import StatusDetails, { ResponseCodes } from './details-status';
import styles from './payments.module.css';
import { format } from 'date-fns';

type PaymentItemProps = {
    order: any;
    isExpanded: boolean;
    onClick: () => void;
};

const PaymentItem: React.FC<PaymentItemProps> = ({ order, isExpanded, onClick }) => {
    const total = (order.amount + order.tipAmount + order.networkFee + order.serviceFee + order.taxFee).toFixed(2);

    return (
        <div className={styles.rowContainer}>
            <div
                className={styles.paymentRow}
                onClick={onClick}
            >
                <div>{order.id}</div>
                <div>{total}</div>
                <div>{order.status}</div>
                <div>{format(new Date(order.createdAt), 'yyyy-MM-dd hh:mm')}</div>
            </div>
            {isExpanded && order.customer && <CustomerDetails customer={order.customer} />}
            {isExpanded && <PaymentDetails order={order} />}
            {isExpanded && <StatusDetails order={order} />}
        </div>
    );
};

export default PaymentItem;

