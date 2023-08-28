"use client"

import NetworkMode from "@/components/gateway/network-mode";
import SupportedNetworks from "@/components/gateway/supported-networks";
import SupportedTokens from "@/components/gateway/supported-tokens";
import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import Widget from "@/components/generics/widget";
import Agent from "@/components/widgets/agent";
import Shortcuts from "@/components/widgets/shortcuts";
import { useState } from "react";

export default function Gateway() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);

    return (
        <div className="relative w-screen h-screen">
            <Container title={"Gateway"}>
                <SupportedNetworks />
                <SupportedTokens />
                <NetworkMode />
            </Container>

            <CommandBar
                slot1={'Shortcuts'}
                slot2={'Agent'}
                changeWidget={setActiveWidget}
            />

            {activeWidget === 'Shortcuts' && <Widget title="Shortcuts"><Shortcuts viewType={"gateway"} /></Widget>}
            {activeWidget === 'Agent' && <Widget title="Agent"><Agent viewType={"gateway"} /></Widget>}

        </div>
    )
}