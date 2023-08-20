import Satellites from "./satellites";

export default function Orbital() {
    const links = [
        { path: '/protected/orders', label: 'Orders' },
        { path: '/protected/payments', label: 'Payments' },
        { path: '/protected/gateway', label: 'Gateway' },
        { path: '/protected/settings', label: 'Settings' },
    ];
    return (
        <div className="fixed z-50 w-0 bottom-50 lg:-top-0 lg:-left-0">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-137 h-137 border-4 border-violet-600 rounded-full -origin-top-left rotate-[-45deg]"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-112 h-112 bg-gradient-radial rounded-full"></div>
            <Satellites links={links} radius={310} />
        </div>
    );
}
