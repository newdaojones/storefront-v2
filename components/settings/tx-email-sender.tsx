import Tooltip from "../generics/tooltip";


type StorefrontNameProps = {
    merchName: string; // Need to replace merchant name with email sender name
    isEditing: boolean;
    onNameChange: (name: string) => void;
};

export default function TxEmailSenderName({ merchName, isEditing, onNameChange }: StorefrontNameProps) {

    const tooltipContent = (
        <div className="grid grid-rows-2 items-center w-80 bg-gray-500 bg-opacity-600 rounded-sm text-notpurple p-2">
            <p className="text-sm">This is the name that will appear in the <strong>From</strong> field of the email sent to your customers.</p>
            <p className="text-sm">For example, if you set this to <strong>{merchName}</strong>, the email will appear to be sent from <strong>{merchName}</strong></p>
        </div>
    );

    return (
        <div className="grid grid-cols-2 gap-2 px-4 py-2 space-x-12 border-b-2 border-ualert">
            <Tooltip content={tooltipContent}>
                <div className="col-span-1"><strong>Email Sender Name</strong></div>
            </Tooltip>
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
