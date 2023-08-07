declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            NEXT_PUBLIC_WALLETCONNECT_PID: string;
            NEXT_PUBLIC_ALCHEMY_API_KEY: string;
            NEXT_PUBLIC_PYLON_API_URI: string;
            NEXT_PUBLIC_PYLON_PASSWORD: string;
            NEXT_PUBLIC_CHAIN_ID: string;
        }
    }
}

export { };
