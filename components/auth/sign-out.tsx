"use client";
import { useWalletConnectClient } from "@/app/providers/walletconnect";
import { sendLog } from "@/lib/log";

export default function SignOut() {
  const { disconnect } = useWalletConnectClient()

  const onDisconnect = () => {
    sendLog({
      message: 'user clicked logout'
    })

    disconnect(true)
  }

  return (
    <button
      className="justify-start text-gray-400 hover:text-ualert transition-all"
      onClick={() => onDisconnect()}
    >
      Disconnect from Storefront!
    </button>
  );
}
