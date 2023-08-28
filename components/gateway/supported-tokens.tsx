import Toggle from "./toggle";

export default function SupportedTokens() {
    return (
        <div className="flex flex-col space-y-4">
            <div className="text-charyo font-bold">Supported Tokens</div>
            <Toggle isChecked={false} onToggle={() => { }} label="USDC" />
        </div>
    );
}