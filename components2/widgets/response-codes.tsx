// widgets/response-code.tsx

type ResponseCodeProps = {
    data: any;
}

export default function ResponseCode({ data }: ResponseCodeProps) {
    console.log(data);
    return (
        <div className="border p-4">
            <p><strong>Order ID:</strong> {data?.orderId}</p>
            <p><strong>Status:</strong> {data?.orderStatus}</p>
            // ... add more fields as necessary
        </div>
    );
}
