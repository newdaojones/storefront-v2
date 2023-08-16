"use client"

import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import Widget from "@/components/generics/widget";
import OnboardButtons from "@/components/onboard/buttons";
import OnboardIntro from "@/components/onboard/intro";
import Agent from "@/components/widgets/agent";
import Shortcuts from "@/components/widgets/shortcuts";
import Tips from "@/components/widgets/tips";
import { useState } from "react";

export default function Onboard() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);

    return (
        <div className="relative w-screen h-screen">
            <Container title={"Onboard"} footer={<OnboardButtons />}>
                <OnboardIntro />
            </Container>

            <CommandBar
                slot1={'Tips'}
                slot2={'Shortcuts'}
                slot3={'Agent'}
                changeWidget={setActiveWidget}
            />

            {activeWidget === 'Tips' && <Widget title="Tips"><Tips viewType={"onboard"} /></Widget>}
            {activeWidget === 'Shortcuts' && <Widget title="Shortcuts"><Shortcuts viewType={"onboard"} /></Widget>}
            {activeWidget === 'Agent' && <Widget title="Agent"><Agent viewType={"onboard"} /></Widget>}

        </div>
    )
}