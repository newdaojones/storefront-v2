

export default function formatWalletAddress(address: string): string {
    if (address.length <= 8) return address; // Return the address as-is if it's short
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
