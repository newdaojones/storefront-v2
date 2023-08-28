"use client";
import { useWalletConnectClient } from "@/app/providers/walletconnect";

export default function SignOut() {
  const { disconnect } = useWalletConnectClient()
  return (
    <button
      className="justify-start text-gray-400 hover:text-ualert transition-all"
      onClick={() => disconnect(true)}
    >
      Disconnect from Storefront!
    </button>
  );
}
