import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex h-screen w-screen overflow-auto bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('../public/bgr2.0.svg')",
        backgroundSize: 'cover',
      }}
    >
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Image
          width={512}
          height={512}
          src="/not-holo.png"
          alt="an agency"
          className="w-48 h-48"
        />
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl">
            Storefront
          </h1>
          <p className="text-stone-400 mt-5">
            Welcome to self-sovereign merchant services.
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/protected"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Begin
          </Link>
          <p className="text-white">·</p>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Agent
          </a>
          <p className="text-white">·</p>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Constitution
          </a>
        </div>
      </div>
    </div>
  );
}
