
type SettingsButtonProps = {
    onSave: () => void;
    onEdit: () => void;
    isEditing: boolean;
    hasChanges: boolean;
};

export default function SettingsButtons({ onSave, onEdit, isEditing, hasChanges }: SettingsButtonProps) {

    return (
        <div className="grid grid-cols-2 gap-4 md:gap-12 lg:gap-20">
            <button onClick={onEdit}
                className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-notpurple content-center bg-purps hover:bg-ualert md:w-36">
                {isEditing ? "Cancel" : "Edit"}
            </button>
            <button
                onClick={onSave}
                disabled={!hasChanges}
                className={`w-24 p-4 h-12 flex justify-center items-center rounded-md ${hasChanges ? "text-notpurple content-center bg-purps hover:bg-ualert" : "bg-gray-300 cursor-not-allowed"} md:w-36`}>
                Save
            </button>
        </div>
    );

}