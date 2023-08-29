type PaymentDetailsProps = {
    data: any;
}

export default function PaymentDetails({ data }: PaymentDetailsProps) {
    console.log(data);
    return (

        <div className="w-fit h-fit overflow-auto grid grid-rows-4 bg-notpurple text-charyo bg-opacity-70 p-8 border-purps border-4 rounded-md">
            <div className="h-fit grid grid-cols-2">
                <div className="grid grid-rows-1"><strong>Status</strong></div>
                <div className="grid grid-rows-1">{data?.chargeStatus}</div>
                <div className="grid grid-rows-1"><strong>Authorization</strong></div>
                <div className="grid grid-rows-1">{data?.chargeCode}</div>
                <div className="grid grid-rows-1"><strong>Last 4 of Card</strong></div>
                <div className="grid grid-rows-1">{data?.last4}</div>
            </div>
            <div className="h-fit grid grid-rows-2">
                <div className="grid grid-rows-1"><strong>Message</strong></div>
                <div className="grid grid-rows-1">{data?.chargeMsg}</div>
            </div>
            <div className="h-fit grid grid-cols-2">
                <div className="grid grid-rows-1"><strong>Order</strong></div>
                <div className="grid grid-rows-1">${data?.amount}</div>
                <div className="grid grid-rows-1"><strong>Tip Amount</strong></div>
                <div className="grid grid-rows-1">${data?.tipAmount}</div>
                <div className="grid grid-rows-1"><strong>Service Fee</strong></div>
                <div className="grid grid-rows-1">${data?.serviceFee}</div>
                <div className="grid grid-rows-1"><strong>Tax Fee</strong></div>
                <div className="grid grid-rows-1">${data?.taxFee}</div>
            </div>
            <div className="h-fit grid grid-rows-2 pt-8">
                <div className="grid grid-rows-1"><strong>Message</strong></div>
                <div className="grid grid-rows-1">{data?.chargeId}</div>
            </div>

        </div>

    );
}