type MerchUsernameProps = {
    merchName: string;
};

export default function MerchUsername({ merchName }: MerchUsernameProps) {
    return (
        <div className="grid grid-cols-2 gap-12 px-4">
            <div className="col-span-1 justify-self-start">Merchant Username</div>
            <div className="col-span-1 justify-self-center">{merchName}</div>
        </div>
    )
}