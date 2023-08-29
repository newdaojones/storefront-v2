// widgets/response-code.tsx

type ResponseCodeProps = {
    data: any;
}

export default function ResponseCode({ data }: ResponseCodeProps) {
    console.log(data);
    return (
        <div className="w-fit date-range-picker grid grid-rows-4 shadow-md bg-notpurple text-charyo bg-opacity-70 p-4 border-purps border-4 rounded-md">
            <div className="grid grid-cols-2 py-0 px-4">
                <div className="space-y-1"><strong>Status:</strong></div>
                <div className="space-y-1">{data?.chargeStatus}</div>
                <div className="space-y-1"><strong>Authorization</strong></div>
                <div className="space-y-1">{data?.chargeCode}</div>
                <div className="space-y-1"><strong>Last 4 of Card:</strong></div>
                <div className="space-y-1">{data?.last4}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="space-y-1"><strong>Message:</strong></div>
                <div className="space-y-1">{data?.chargeMsg}</div>
            </div>
            <div className="grid grid-cols-2 py-0 px-4">
                <div className="space-y-1"><strong>Order Amount:</strong></div>
                <div className="space-y-1">${data?.amount}</div>
                <div className="space-y-1"><strong>Order Tip:</strong></div>
                <div className="space-y-1">${data?.tipAmount}</div>
                <div className="space-y-1"><strong>Service Fee:</strong></div>
                <div className="space-y-1">${data?.serviceFee}</div>
                <div className="space-y-1"><strong>Tax Fee:</strong></div>
                <div className="space-y-1">${data?.taxFee}</div>
                <div className="space-y-1"><strong>Total:</strong></div>
                <div className="space-y-1">${data?.chargeAmount}</div>
            </div>
            <div className="grid grid-rows-2 pt-2 px-4">
                <div className="space-y-1"><strong>CKO Network ID:</strong></div>
                <div className="space-y-1">{data?.chargeId}</div>
            </div>
        </div>

    );
}