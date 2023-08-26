import Tooltip from "../generics/tooltip";


type OrderButtonProps = {
    onSubmit: () => void;
    onClear: () => void;
    isOrderValid: boolean;
};

export default function OrderButtons({ onSubmit, onClear, isOrderValid }: OrderButtonProps) {

    return (
        <div className="grid grid-cols-2 gap-4 md:gap-12 lg:gap-20">
            <Tooltip text="Clear all items in the order">
                <button onClick={onClear}
                    className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-notpurple content-center bg-purps hover:bg-ualert md:w-36">
                    Clear
                </button>
            </Tooltip>
            <Tooltip text="Submit order">
                <button onClick={onSubmit}
                    disabled={!isOrderValid}
                    className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-notpurple content-center bg-purps hover:bg-ualert md:w-36">
                    Submit
                </button>
            </Tooltip>
        </div>
    )
}