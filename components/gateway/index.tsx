import NetworkMode from "./network-mode";
import SupportedNetworks from "./supported-networks";
import SupportedTokens from "./supported-tokens";


export default function GatewayLayout() {

    return (
        <div title="Gateway" className="grid grid-cols-3 gap-2 space-x-20 pt-8">
            <SupportedNetworks />
            <SupportedTokens />
            <NetworkMode />
        </div>
    )
}