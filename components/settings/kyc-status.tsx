type MerchKycStatusProp = {
    kycStatus: string;
};

export default function MerchKycStatus({ kycStatus }: MerchKycStatusProp) {
    return (
        <div className="grid grid-cols-2 gap-2 px-4 py-2 space-x-12 border-b-2 border-ualert">
            <div className="col-span-1"><strong>KYC Status</strong></div>
            <div className="col-span-1">{kycStatus}</div>
        </div>
    )
}