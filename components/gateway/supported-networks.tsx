import Toggle from "./toggle";

export default function SupportedNetworks() {
    return (
        <div className="flex flex-col space-y-4">
            <div className="text-charyo font-bold">Supported Networks</div>
            <Toggle isChecked={false} onToggle={() => { }} label="Ethereum" />
            <Toggle isChecked={true} onToggle={() => { }} label="Polygon" />
            <Toggle isChecked={false} onToggle={() => { }} label="Avalanche" />
        </div>
    );
}
