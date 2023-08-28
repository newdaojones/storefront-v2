
type TipsProps = {
    viewType: 'onboard' | 'payments';
};

export default function Tips({ viewType }: TipsProps) {
    if (viewType === 'onboard') {
        return (
            <div>
                Onboard content goes here...
            </div>
        );
    } else if (viewType === 'payments') {
        return (
            <div>
                This will be the payments tip calculator and will need to data from Pylon
            </div>
        );
    }
}
