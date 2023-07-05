import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import React from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { arbitrum, arbitrumGoerli, goerli, mainnet, optimism, optimismGoerli, polygon, polygonMumbai, sepolia, } from "wagmi/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";

type WagmiProviderType = {
    children: React.ReactNode;
};


const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PID;

const { chains, publicClient } = configureChains(
    [mainnet, sepolia, goerli, polygon, polygonMumbai, arbitrum, arbitrumGoerli, optimism, optimismGoerli],
    [alchemyProvider({ apiKey: projectId })],
);

const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    connectors: [
        new WalletConnectConnector({
            chains,
            options: {
                projectId: projectId,
                showQrModal: true,
            },
        }),
    ]
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);
const WagmiProvider = ({ children }: WagmiProviderType) => {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    );
};

export default WagmiProvider;
