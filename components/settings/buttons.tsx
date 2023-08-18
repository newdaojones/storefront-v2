import Tooltip from "../tooltips/tooltip";

type SettingsButtonProps = {
    onSave: () => void;
    onEdit: () => void;
    isEditing: boolean;
    hasChanges: boolean;
};

export default function SettingsButtons({ onSave, onEdit, isEditing, hasChanges }: SettingsButtonProps) {

    return (
        <div className="grid grid-cols-2 gap-4 md:gap-12 lg:gap-20">
            <Tooltip text={isEditing ? "Cancel changes" : "Edit merchant username"}>
                <button onClick={onEdit}
                    className="w-24 p-4 h-12 flex justify-center items-center rounded-md bg-blue-300 hover:bg-violet-600 md:w-28 lg:w-32">
                    {isEditing ? "Cancel" : "Edit"}
                </button>
            </Tooltip>
            <Tooltip text="Save changes">
                <button
                    onClick={onSave}
                    disabled={!hasChanges}
                    className={`w-24 p-4 h-12 flex justify-center items-center rounded-md ${hasChanges ? "bg-blue-300 hover:bg-violet-600" : "bg-gray-300 cursor-not-allowed"} md:w-28 lg:w-32`}>
                    Save
                </button>
            </Tooltip>
        </div>
    );

}