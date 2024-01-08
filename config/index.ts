export const config = {
  PYLON_API_URI: process.env.NEXT_PUBLIC_PYLON_API_URI,
  WALLETCONNECT_PID: process.env.NEXT_PUBLIC_WALLETCONNECT_PID,
  PYLON_PASSWORD: process.env.NEXT_PUBLIC_PYLON_PASSWORD,
  CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
  DISCORD_URI: process.env.NEXT_PUBLIC_DISCORD_URI,
  IS_PRODUCTION: process.env.NODE_ENV === "production",
};
