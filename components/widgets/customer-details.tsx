type CustomerDetailsProps = {
    data: any;
}

export default function CustomerDetails({ data }: CustomerDetailsProps) {

    return (

        <div className="w-fit h-fit date-range-picker grid grid-rows-6 shadow-md bg-notpurple text-charyo bg-opacity-70 p-4 border-purps border-4 rounded-md">
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Checkout</strong></div>
                <div className="grid grid-rows-1">{data?.customer?.firstName} {data?.customer?.lastName}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Email:</strong></div>
                <div className="grid grid-rows-1">{data?.email}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Phone Number:</strong></div>
                <div className="grid grid-rows-1">{data?.phoneNumber}</div>
            </div>
            <div className="grid grid-rows-2 py-0 px-4">
                <div className="grid grid-rows-1"><strong>Address:</strong></div>
                <div className="grid grid-rows-1">{data?.customer?.streetAddress}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="grid grid-rows-2 py-0 px-4">
                    <div className="grid grid-rows-1"><strong>Unit:</strong></div>
                    <div className="grid grid-rows-1">{data?.customer?.streetAddress2}</div>
                </div>
                <div className="grid grid-rows-2 py-0 px-4">
                    <div className="grid grid-rows-1"><strong>Postal Code:</strong></div>
                    <div className="grid grid-rows-1">{data?.customer?.postalCode}</div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="grid grid-rows-2 py-0 px-4">
                    <div className="grid grid-rows-1"><strong>City:</strong></div>
                    <div className="grid grid-rows-1">{data?.customer?.city}</div>
                </div>
                <div className="grid grid-rows-2 py-0 px-4">
                    <div className="grid grid-rows-1"><strong>State:</strong></div>
                    <div className="grid grid-rows-1">{data?.customer?.state}</div>
                </div>
            </div>
        </div>

    );
}