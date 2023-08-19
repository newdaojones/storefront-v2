"use client"

import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import Widget from "@/components/generics/widget";
import AppVersion from "@/components/settings/app-version";
import SettingsButtons from "@/components/settings/buttons";
import MerchKycStatus from "@/components/settings/kyc-status";
import MerchUsername from "@/components/settings/merchant-username";
import SettlementAddress from "@/components/settings/settlement-address";
import Agent from "@/components/widgets/agent";
import Shortcuts from "@/components/widgets/shortcuts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { default as formatWalletAddress } from "utils/formatWalletAddr";

export default function Settings() {
    const { data: session } = useSession();
    const [activeWidget, setActiveWidget] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    function getDefaultMerchName(): string {
        return session?.user?.name ?? '🛑 No Name';
    }
    const [currentMerchName, setMerchName] = useState<string>(getDefaultMerchName());

    useEffect(() => {
        if (session?.user?.name) {
            setMerchName(session.user.name);
        }
    }, [session]);


    const handleSave = () => {
        setIsEditing(false);
    }

    const handleEdit = () => {
        setIsEditing(prevEditing => !prevEditing);
    }

    const handleNameChange = (newName: string) => {
        if (newName !== currentMerchName) {
            setHasChanges(true);
        }
        setMerchName(newName);
    }


    return (
        <div className="relative w-screen h-screen">
            <Container title={"Settings"} footer={<SettingsButtons onSave={handleSave} onEdit={handleEdit} isEditing={isEditing} hasChanges={false} />}>
                {session && (
                    <>
                        <SettlementAddress settlementAddr={formatWalletAddress(session.address || '🛑 No Address')} />
                        <MerchUsername
                            merchName={currentMerchName}
                            isEditing={isEditing}
                            onNameChange={setMerchName} />
                        <MerchKycStatus kycStatus={(session?.user.status || '🛑 No KYC Status')} />
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