// merchant-username.tsx:

type MerchUsernameProps = {
    merchName: string;
    isEditing: boolean;
    onNameChange: (name: string) => void;
};

export default function MerchUsername({ merchName, isEditing, onNameChange }: MerchUsernameProps) {
    return (
        <div className="grid grid-cols-2 gap-12 px-4">
            <div className="col-span-1 justify-self-start">Merchant Username</div>
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
