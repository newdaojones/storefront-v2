import Link from "next/link";

export default function OnboardButtons() {

    return (
        <div className="grid grid-cols-2 space-x-12">
            <Link href="https://storefront-too-test.vercel.app">
                <button className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-notpurple content-center bg-purps hover:bg-ualert md:w-36">Demo</button>
            </Link>
            <Link href="/protected/onboard/kyc">
                <button className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-notpurple content-center bg-purps hover:bg-ualert md:w-36">KYC</button>
            </Link>
        </div>
    )
}