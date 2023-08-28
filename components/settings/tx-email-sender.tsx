

type StorefrontNameProps = {
    merchName: string; // Need to replace merchant name with email sender name
    isEditing: boolean;
    onNameChange: (name: string) => void;
};

export default function TxEmailSenderName({ merchName, isEditing, onNameChange }: StorefrontNameProps) {
    return (
        <div className="grid grid-cols-2 gap-2 px-4 py-2 space-x-12 border-b-2 border-ualert">
            <div className="col-span-1"><strong>Email Sender Name</strong></div>
            <div className="col-span-1">
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
