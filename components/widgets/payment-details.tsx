// widgets/response-code.tsx

type ResponseCodeProps = {
    data: any;
}

export default function ResponseCode({ data }: ResponseCodeProps) {
    console.log(data);
    return (
        <div className="py-2 px-4">
            <p><strong>CKO Network ID:</strong> {data?.chargeId}</p>
            <p><strong>Last 4:</strong> {data?.last4}</p>
            <p><strong>Authorization:</strong> {data?.chargeCode}</p>
            <p><strong>Message:</strong> {data?.chargeMsg}</p>
            <p><strong>Status:</strong> {data?.chargeStatus}</p>
            <p><strong>Order Amount:</strong> {data?.amount}</p>
            <p><strong>Order Tip:</strong> {data?.tipAmount}</p>
            <p><strong>Network Fee:</strong> {data?.networkFee}</p>
            <p><strong>Service Fee:</strong> {data?.serviceFee}</p>
            <p><strong>Tax Fee:</strong> {data?.taxFee}</p>
            <p><strong>Total:</strong> {data?.chargeAmount}</p>
        </div>

    );
}
