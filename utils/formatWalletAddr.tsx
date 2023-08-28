export default function formatWalletAddress(address: string): string {

    // Make the wallet address human readable
    if (address.length <= 8) {
        return address;
    }

    const formattedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

    return formattedAddress;
}
