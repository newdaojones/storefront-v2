export const DEFAULT_LOGGER = 'info';
export const DEFAULT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PID;
export const DEFAULT_RELAY_URL = 'wss://relay.walletconnect.com';
export const DEFAULT_MERCHANT_APP_METADATA = {
  name: 'Storefront Merchant',
  description: 'StoreFront Merchant Dashboard',
  url: 'https://jxndao.com',
  icons: ['https://jxndao.com/logo192.png'],
};
export enum DEFAULT_EIP_155_EVENTS {
  ETH_CHAIN_CHANGED = "chainChanged",
  ETH_ACCOUNTS_CHANGED = "accountsChanged",
}
export enum DEFAULT_EIP155_METHODS {
  ETH_SEND_TRANSACTION = "eth_sendTransaction",
  ETH_SIGN_TRANSACTION = "eth_signTransaction",
  ETH_SIGN = "eth_sign",
  PERSONAL_SIGN = "personal_sign",
}

export enum DEFAULT_COSMOS_METHODS {
  COSMOS_SIGN_DIRECT = "cosmos_signDirect",
  COSMOS_SIGN_AMINO = "cosmos_signAmino",
}

export enum DEFAULT_COSMOS_EVENTS { }

/**
 * SOLANA
 */
export enum DEFAULT_SOLANA_METHODS {
  SOL_SIGN_TRANSACTION = "solana_signTransaction",
  SOL_SIGN_MESSAGE = "solana_signMessage",
}

export enum DEFAULT_SOLANA_EVENTS { }
