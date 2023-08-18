"use client"

import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import Widget from "@/components/generics/widget";
import OnboardButtons from "@/components/onboard/buttons";
import AppVersion from "@/components/settings/app-version";
import MerchKycStatus from "@/components/settings/kyc-status";
import MerchUsername from "@/components/settings/merchant-username";
import SettlementAddress from "@/components/settings/settlement-address";
import Agent from "@/components/widgets/agent";
import Shortcuts from "@/components/widgets/shortcuts";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { default as formatWalletAddress } from "utils/formatWalletAddr";

export default function Settings() {
    const { data: session } = useSession();
    const [activeWidget, setActiveWidget] = useState<string | null>(null);
    const [merchKyc, setMerchKyc] = useState<string | null>(null);

    return (
        <div className="relative w-screen h-screen">
            <Container title={"Settings"} footer={<OnboardButtons />}>
                {session && (
                    <>
                        <SettlementAddress settlementAddr={formatWalletAddress(session.address || 'Error: No Address')} />
                        <MerchUsername merchName={formatWalletAddress(session?.user?.name || 'Error: No Name')} />
                    </>
                )}

                {merchKyc && (
                    <>
                        <MerchKycStatus kycStatus={merchKyc} />
                    </>
                )}
                <AppVersion />
            </Container>

            <CommandBar
                slot1={'Shortcuts'}
                slot2={'Agent'}
                changeWidget={setActiveWidget}
            />

            {activeWidget === 'Shortcuts' && <Widget title="Shortcuts"><Shortcuts viewType={"settings"} /></Widget>}
            {activeWidget === 'Agent' && <Widget title="Agent"><Agent viewType={"settings"} /></Widget>}
        </div>
    )
}