import packageJson from '../../package.json';

const version = packageJson.version;

export default function AppVersion() {
    return (
        <div className="grid grid-cols-2 gap-2 px-4 py-2 space-x-12 border-b-2 border-ualert">
            <div className="col-span-1"><strong>App Version</strong></div>
            <div className="col-span-1">{version}</div>
        </div>
    )
}