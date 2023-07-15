export const avalanche = {
    id: 43_114,
    name: 'Avalanche',
    network: 'avalanche',
    nativeCurrency: {
        decimals: 18,
        name: 'Avalanche',
        symbol: 'AVAX',
    },
    rpcUrls: {
        default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
        public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    },
    blockExplorers: {
        etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
        default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    }
}