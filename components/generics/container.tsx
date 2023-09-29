type Props = {
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Container({ title, children, footer }: Props) {
    return (
        <div className="grid w-screen h-screen place-items-center">
            <div className="shadow-inner shadow-black flex flex-col w-full h-full center px-2 py-4 relative bg-lavender bg-opacity-30 backdrop-blur-md rounded-lg border-4 border-purps justify-between sm:w-2/3 sm:h-2/3 md:w-2/3 md:h-2/3 lg:w-2/3 lg:h-2/3 xl:w-1/2 xl:h-3/4 2xl:w-1/2 2xl:h-3/4 2xl:px-6">
                <div className="h-full scrollbar-custom overflow-auto overscroll-y-contain md:overflow-auto flex flex-col">
                    <div className="text-center text-charyo text-lg font-bold leading-normal md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl mb-8 mt-4">{title}</div>
                    <div className="flex-grow flex flex-col justify-center items-center flex-1">
                        {children}
                    </div>
                </div>
                {footer && (
                    <div className="mt-auto flex justify-center lg:my-10">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
