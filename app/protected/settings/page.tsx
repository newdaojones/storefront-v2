"use client"

import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import Widget from "@/components/generics/widget";
import AppVersion from "@/components/settings/app-version";
import SettingsButtons from "@/components/settings/buttons";
import MerchKycStatus from "@/components/settings/kyc-status";
import SettlementAddress from "@/components/settings/settlement-address";
import StorefrontName from "@/components/settings/storefront-name";
import TxEmailSenderName from "@/components/settings/tx-email-sender";
import Agent from "@/components/widgets/agent";
import Shortcuts from "@/components/widgets/shortcuts";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { default as formatWalletAddress } from "utils/formatWalletAddr";

export default function Settings() {
    const { data: session, update: sessionUpdate } = useSession()
    const [activeWidget, setActiveWidget] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMerchName, setMerchName] = useState<string>('');
    const sessionDisplayName = useMemo(() => session?.user?.merchant?.displayName || session?.user?.merchant?.name || '', [session])
    const hasChanges = useMemo(() => currentMerchName !== sessionDisplayName, [sessionDisplayName, currentMerchName])

    function getDefaultMerchName(): string {
        return session?.user?.merchant?.name ?? '🛑 No Name';
    }


    useEffect(() => {
        setMerchName(sessionDisplayName);
    }, [sessionDisplayName]);


    const handleSave = async () => {
        setIsEditing(false)
        try {
            const response = await fetch('/api/merchant', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    displayName: currentMerchName
                }),
            });

            const result = await response.json();

            if (response.ok && session) {
                sessionUpdate({
                    user: {
                        ...session.user,
                        merchant: result
                    },
                    isNewUser: false,
                })
                toast.success('Updated successfully')
            } else {
                throw new Error(result.message || result.error)
            }
        } catch (error: any) {
            toast.error(error.message)
            setMerchName(sessionDisplayName)
        }
    }

    const handleEdit = () => {
        setIsEditing(prevEditing => !prevEditing);
    }

    return (
        <div className="relative w-screen h-screen">
            <Container title={"Settings"} footer={<SettingsButtons onSave={handleSave} onEdit={handleEdit} isEditing={isEditing} hasChanges={hasChanges} />}>
                {session && (
                    <>
                        <div className="w-1/2 py-8">
                            <SettlementAddress settlementAddr={formatWalletAddress(session.address || '🛑 No Address')} />
                            <StorefrontName
                                merchName={getDefaultMerchName()} />
                            <TxEmailSenderName
                                merchName={currentMerchName}
                                isEditing={isEditing}
                                onNameChange={setMerchName} />
                            <MerchKycStatus kycStatus={(session?.user.status || '🛑 No KYC Status')} />
                            <AppVersion />
                        </div>
                    </>
                )}
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