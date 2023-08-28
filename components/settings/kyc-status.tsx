type MerchKycStatusProp = {
    kycStatus: string;
};

export default function MerchKycStatus({ kycStatus }: MerchKycStatusProp) {
    return (
        <div className="grid grid-cols-2 gap-12 px-4">
            <div className="col-span-1">KYC Status</div>
            <div className="col-span-1 justify-self-center">{kycStatus}</div>
        </div>
    )
}