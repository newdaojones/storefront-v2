

type AgentProps = {
    viewType: 'onboard' | 'orders' | 'payments' | 'settings' | 'gateway';
};

export default function Agent({ viewType }: AgentProps) {

    if (viewType === 'onboard') {
        return (
            <div>
                Onboard content goes here...
            </div>
        );
    } else if (viewType === 'orders') {
        return (
            <div>
                This will be the orders shortcuts
            </div>
        );
    } else if (viewType === 'payments') {
        return (
            <div>
                This will be the payments shortcuts
            </div>
        );
    } else if (viewType === 'settings') {
        return (
            <div>
                This will be the settings shortcuts
            </div>
        );
    } else if (viewType === 'gateway') {
        return (
            <div>
                This will be the gateway shortcuts
            </div>
        );
    }
}
