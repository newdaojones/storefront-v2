type CustomerDetailsProps = {
    data: any;
}

export default function CustomerDetails({ data }: CustomerDetailsProps) {
    console.log(data);
    return (
        <div className="py-2 px-4">
            <p><strong>Customer:</strong> {data?.firstName} {data?.lastName}</p>
            <p><strong>Email:</strong> {data?.email}</p>
            <p><strong>Phone:</strong> {data?.phoneNumber}</p>
            <p><strong>Address:</strong> {data?.address}</p>
        </div>

    );
}