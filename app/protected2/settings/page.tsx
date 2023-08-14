"use client"

import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import Widget from "@/components/generics/widget";
import OnboardButtons from "@/components/onboard2/buttons";
import Agent from "@/components/widgets2/agent";
import Shortcuts from "@/components/widgets2/shortcuts";
import { useState } from "react";

export default function Settings() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);

    return (
        <div className="relative w-screen h-screen">
            <Container title={"Settings"} footer={<OnboardButtons />}>

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