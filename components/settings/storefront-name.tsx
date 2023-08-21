// merchant-username.tsx:

type StorefrontNameProps = {
    merchName: string;
    isEditing: boolean;
    onNameChange: (name: string) => void;
};

export default function StorefrontName({ merchName, isEditing, onNameChange }: StorefrontNameProps) {
    return (
        <div className="grid grid-cols-2 gap-12 px-4">
            <div className="col-span-1 justify-self-start">Storefront Name</div>
            <div className="col-span-1 justify-self-center">
                {isEditing ?
                    <input
                        type="text"
                        value={merchName}
                        onChange={(e) => onNameChange(e.target.value)}
                        className="border rounded-md p-2"
                    />
                    :
                    merchName
                }
            </div>
        </div>
    )
}
