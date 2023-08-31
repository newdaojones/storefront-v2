"use client"

// Slots are filled by props passed at the top level layout.tsx currently
type Props = {
    slot1: string
    slot2?: string
    slot3?: string
    slot4?: string
    slot5?: string
    children?: React.ReactNode
    changeWidget?: (widget: string) => void
}

export default function CommandBar({ slot1, slot2, slot3, slot4, slot5, changeWidget }: Props) {

    return (
        <nav className="fixed w-full mx-2 grid items-center grid-cols-1 navbar-styles h-20 flex-shrink-0 sm:bg-gradient-to-r sm:from-transparent sm:from-20% sm:via-purps sm:to-aquayuck sm:top-0 bottom-36">
            <ul className="w-full grid grid-cols-5 gap-2 text-center md:gap-x-4 md:grid-cols-[1fr,auto,auto,auto,auto] md:px-12 lg:gap-x-8 lg:px-18 2xl:gap-x-12 2xl:px-20 ">
                <li className="hidden md:block"></li> {/* This is a spacer for large screens */}
                <li className="cursor-pointer sm:block mb-2 sm:mb-0">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault;
                            changeWidget && changeWidget(slot1);
                        }}
                        className="p-2 bg-purps text-notpurple rounded shadow-md sm:bg-transparent sm:text-current sm:shadow-none sm:p-0">
                        {slot1}
                    </button>
                </li>
                <li className="cursor-pointer sm:block mb-2 sm:mb-0">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault;
                            changeWidget && changeWidget(slot2 || '');
                        }}
                        className="p-2 bg-purps text-notpurple rounded shadow-md sm:bg-transparent sm:text-current sm:shadow-none sm:p-0">
                        {slot2}
                    </button>
                </li>
                <li className="cursor-pointer sm:block mb-2 sm:mb-0">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault;
                            changeWidget && changeWidget(slot3 || '');
                        }}
                        className="p-2 bg-purps text-notpurple rounded shadow-md sm:bg-transparent sm:text-current sm:shadow-none sm:p-0">
                        {slot3}
                    </button>
                </li>
                <li className="cursor-pointer sm:block mb-2 sm:mb-0">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault;
                            changeWidget && changeWidget(slot4 || '');
                        }}
                        className="p-2 bg-purps text-notpurple rounded shadow-md sm:bg-transparent sm:text-current sm:shadow-none sm:p-0">
                        {slot4}
                    </button>
                </li>
            </ul>
        </nav>
    )
}
