

type SettlementAddrProps = {
    settlementAddr: string;
};

export default function SettlementAddress({ settlementAddr }: SettlementAddrProps) {
    return (
        <div className="grid grid-cols-2 gap-12 px-4">
            <div className="col-span-1 justify-self-start">Settlement Address</div>
            <div className="col-span-1 justify-self-center">{settlementAddr}</div>
        </div>
    )
}