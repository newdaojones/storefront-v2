// widgets/response-code.tsx

type ResponseCodeProps = {
    data: any;
}

export default function ResponseCode({ data }: ResponseCodeProps) {
    console.log(data);
    return (
        <div className="w-fit date-range-picker grid grid-rows-2 shadow-md bg-gray-500 bg-opacity-40 p-4 border-purps border-4 rounded-md">
            <div className="grid grid-rows-2 pt-4 px-4">
                <div className="grid grid-rows-1"><strong>CKO Network ID:</strong></div>
                <div className="grid grid-rows-1">{data?.chargeId}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Last 4 of Card:</strong></div>
                <div className="grid grid-rows-1">{data?.last4}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Authorization</strong></div>
                <div className="grid grid-rows-1">{data?.chargeCode}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Message:</strong></div>
                <div className="grid grid-rows-1">{data?.chargeMsg}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Status:</strong></div>
                <div className="grid grid-rows-1">{data?.chargeStatus}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Order Amount:</strong></div>
                <div className="grid grid-rows-1">${data?.amount}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Order Tip:</strong></div>
                <div className="grid grid-rows-1">${data?.tipAmount}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Service Fee:</strong></div>
                <div className="grid grid-rows-1">${data?.serviceFee}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Tax Fee:</strong></div>
                <div className="grid grid-rows-1">${data?.taxFee}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Total:</strong></div>
                <div className="grid grid-rows-1">${data?.chargeAmount}</div>
            </div>
        </div>

    );
}


{/* <div className="py-2 px-4">
<p><strong>CKO Network ID:</strong> {data?.chargeId}</p>
<p><strong>Last 4:</strong> {data?.last4}</p>
<p><strong>Authorization:</strong> {data?.chargeCode}</p>
<p><strong>Message:</strong> {data?.chargeMsg}</p>
<p><strong>Status:</strong> {data?.chargeStatus}</p>
<p><strong>Order Amount:</strong> {data?.amount}</p>
<p><strong>Order Tip:</strong> {data?.tipAmount}</p>
<p><strong>Service Fee:</strong> {data?.serviceFee}</p>
<p><strong>Tax Fee:</strong> {data?.taxFee}</p>
<p><strong>Total:</strong> {data?.chargeAmount}</p>
</div> */}