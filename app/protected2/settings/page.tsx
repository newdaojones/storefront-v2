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
import { Merchant } from "@prisma/client";
import { useEffect, useState } from "react";
import formatWalletAddr from "utils/formatWalletAddr";

export default function Settings() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);
    const [merchant, setMerchant] = useState<Merchant | null>(null);
    const [error, setError] = useState<string | null>(null);

    // const [merchKyc, setMerchKyc] = useState<Merchant | null>(null);
    const [merchKyc, setMerchKyc] = useState<string | null>(null);

    useEffect(() => {

        async function fetchMerchant() {
            try {
                const response = await fetch('/api/settings', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                const result = await response.json();

                if (response.ok) {
                    return result
                } else {
                    throw new Error(result.message || result.error)
                }
            }

            catch (error: any) {
                throw new Error(error.message)
            }
        }

        async function fetchData() {
            try {
                const fetchedMerchant = await fetchMerchant();
                setMerchant(fetchedMerchant);
            } catch (error: any) {
                console.error("Failed to fetch merchant data:", error);
                setError(error.message || "Failed to fetch merchant data");
            }
        }

        fetchData();
    }, []);

    return (
        <div className="relative w-screen h-screen">
            <Container title={"Settings"} footer={<OnboardButtons />}>
                {merchant && (
                    <>
                        <SettlementAddress settlementAddr={formatWalletAddr(merchant.walletAddress)} />
                        <MerchUsername merchName={merchant.name} />
                    </>
                )}
                {merchKyc && (
                    <>
                        <MerchKycStatus kycStatus={merchKyc} />
                    </>
                )}
                <AppVersion />
                {error && <div className="text-red-500">{error}</div>}
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