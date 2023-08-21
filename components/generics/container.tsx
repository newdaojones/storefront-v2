type Props = {
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Container({ title, children, footer }: Props) {
    return (
        <div className="grid w-screen h-screen py-20 md:place-items-center">
            <div className="flex flex-col w-full h-2/3 center px-4 relative overflow-auto bg-stone-200 bg-opacity-50 backdrop-blur-md rounded-lg shadow-inner border-4 border-violet-600 justify-between md:w-3/4 md:h-3/4 md:p-16 lg:w-1/2 lg:h-2/3 lg:p-20 xl:w-1/2 xl:h-2/3 2xl:w-1/2 2xl:h-3/4 2xl:px-6">
                <div className="text-center text-stone-900 text-lg font-bold leading-normal md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl mb-8">{title}</div>
                <div className="flex-grow flex flex-col justify-center items-center">
                    {children}
                </div>
                {footer && (
                    <div className="mt-auto flex justify-center">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
