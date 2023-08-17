type CustomerDetailsProps = {
    data: any;
}

export default function CustomerDetails({ data }: CustomerDetailsProps) {
    console.log(data);
    return (
        <div className="py-2 px-4">
            <p><strong>Customer:</strong> {data?.customer?.firstName} {data?.customer?.lastName}</p>
            <p><strong>Email:</strong> {data?.email}</p>
            <p><strong>Phone:</strong> {data?.phoneNumber}</p>
            <p><strong>Address:</strong> {data?.customer?.streetAddress}</p>
            <p><strong>Address2:</strong> {data?.customer?.streetAddress2}</p>
            <p><strong>City:</strong> {data?.customer?.city}</p>
            <p><strong>State:</strong> {data?.customer?.state}</p>
            <p><strong>Postal Code:</strong> {data?.customer?.postalCode}</p>
        </div>

    );
}