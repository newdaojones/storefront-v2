import packageJson from '../../package.json';

const version = packageJson.version;

export default function AppVersion() {
    return (
        <div className="grid grid-cols-2 gap-12 px-4 pb-32">
            <div className="col-span-1 justify-self-start">App Version</div>
            <div className="col-span-1 justify-self-center">{version}</div>
        </div>
    )
}