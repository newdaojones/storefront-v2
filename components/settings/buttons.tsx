import Tooltip from "../generics/tooltip";

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
                    className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-white content-center bg-violet-500 hover:bg-pink-500 md:w-36">
                    {isEditing ? "Cancel" : "Edit"}
                </button>
            </Tooltip>
            <Tooltip text="Save changes">
                <button
                    onClick={onSave}
                    disabled={!hasChanges}
                    className={`w-24 p-4 h-12 flex justify-center items-center rounded-md ${hasChanges ? "text-white content-center bg-violet-500 hover:bg-pink-500" : "bg-gray-300 cursor-not-allowed"} md:w-36`}>
                    Save
                </button>
            </Tooltip>
        </div>
    );

}