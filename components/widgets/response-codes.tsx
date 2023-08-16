// widgets/response-code.tsx

type ResponseCodeProps = {
    data: any;
}

export default function ResponseCode({ data }: ResponseCodeProps) {
    console.log(data);
    return (
        <div className="border p-4">
            <p><strong>Order ID:</strong> {data?.chargeId}</p>
            <p><strong>Last 4:</strong> {data?.last4}</p>
            <p><strong>Authorization:</strong> {data?.chargeCode}</p>
            <p><strong>Message:</strong> {data?.chargeMsg}</p>
            <p><strong>Status:</strong> {data?.chargeStatus}</p>
        </div>

    );
}
