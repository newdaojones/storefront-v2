import Siwe from "@/components/home/siwe";

export default function Home() {
    const classNames = {
        background: "flex flex-col justify-center items-center h-screen w-screen space-y-4 pb-12",
        text: "text-center text-stone-900 text-lg font-bold md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl",
        qrContainer: "flex flex-col",
    };


    return (
        <main className={classNames.background}>
            <div className={classNames.text}>Storefront</div>
            <div className={classNames.qrContainer}>
                <Siwe />
            </div>
        </main>
    )
}

