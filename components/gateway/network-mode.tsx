import Toggle from "./toggle";

export default function NetworkMode() {
    return (
        <div className="flex flex-col space-y-4">
            <div className="text-gray-800 font-bold">Network Mode</div>
            <Toggle isChecked={false} onToggle={() => { }} label="Testnet" />
        </div>
    );
}