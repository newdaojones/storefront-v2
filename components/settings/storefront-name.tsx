// merchant-username.tsx:

type StorefrontNameProps = {
    merchName: string;
};

export default function StorefrontName({ merchName }: StorefrontNameProps) {
    return (
        <div className="grid grid-cols-2 gap-12 px-4">
            <div className="col-span-1 justify-self-start">Storefront Name</div>
            <div className="col-span-1 justify-self-center">{merchName}</div>
        </div>
    )
}
