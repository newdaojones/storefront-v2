// merchant-username.tsx:

type StorefrontNameProps = {
    merchName: string;
};

export default function StorefrontName({ merchName }: StorefrontNameProps) {
    return (
        <div className="grid grid-cols-2 gap-2 px-4 py-2 space-x-12 border-b-2 border-ualert">
            <div className="col-span-1"><strong>Storefront Name</strong></div>
            <div className="col-span-1">{merchName}</div>
        </div>
    )
}
