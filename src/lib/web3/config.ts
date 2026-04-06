export const BASE_SEPOLIA_CONFIG = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "84532"),
  chainIdHex: `0x${Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "84532").toString(16)}`,
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME ?? "Base Sepolia",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL ?? "https://sepolia.base.org",
  explorerBaseUrl:
    process.env.NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL ?? "https://sepolia-explorer.base.org",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
} as const;

export function buildExplorerTxUrl(hash: string) {
  return `${BASE_SEPOLIA_CONFIG.explorerBaseUrl}/tx/${hash}`;
}
