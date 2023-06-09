
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

type Props = {
    payments: Payment[];
};

export default function PaymentList({ payments }: Props) {
    return (
        <div className="grid grid-cols-9 gap-4 p-4 overflow-auto place-items-center h-screen">
            <div className="font-bold">Order ID</div>
            <div className="font-bold">Amount</div>
            <div className="font-bold">Tip</div>
            <div className="font-bold">Network Fee</div>
            <div className="font-bold">Service Fee</div>
            <div className="font-bold">Tax</div>
            <div className="font-bold">Total</div>
            <div className="font-bold">Status</div>
            <div className="font-bold">Response Code</div>
            {payments.map(payment => (
                <>
                    <div>{payment.orderId}</div>
                    <div>{payment.orderAmount}</div>
                    <div>{payment.tip}</div>
                    <div>{payment.networkFee}</div>
                    <div>{payment.serviceFee}</div>
                    <div>{payment.tax}</div>
                    <div>{payment.orderAmount + payment.tip + payment.networkFee + payment.serviceFee + payment.tax}</div>
                    <div>{payment.status}</div>
                    <div>{payment.responseCode}</div>
                </>
            ))}
        </div>
    );
}