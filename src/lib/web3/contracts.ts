import { ethers } from "ethers";

import { DEMO_CONTRACT_ADDRESSES, hasConfiguredDemoContracts } from "./addresses";
import { BASE_SEPOLIA_CONFIG } from "./config";

export type BrowserWalletProvider = {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: BrowserWalletProvider;
  }
}

const ERC20_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
] as const;

const ERC1155_ABI = ["function balanceOf(address account, uint256 id) view returns (uint256)"] as const;

const MARKETPLACE_ABI = [
  "function listings(uint256 projectId) view returns (address developer, uint256 unitPrice, bool active)",
  "function purchaseCredits(uint256 projectId, uint256 amount)",
] as const;

const RETIREMENT_AGENT_ABI = [
  "function retireCredits(uint256 projectId, uint256 amount, address buyerAddress, string purpose)",
] as const;

export function getInjectedProvider() {
  return typeof window === "undefined" ? undefined : window.ethereum;
}

export function createBrowserProvider(provider: BrowserWalletProvider) {
  return new ethers.BrowserProvider(provider);
}

export async function ensureBaseSepolia(provider: BrowserWalletProvider) {
  const currentChainId = await provider.request({ method: "eth_chainId" });

  if (currentChainId === BASE_SEPOLIA_CONFIG.chainIdHex) {
    return;
  }

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BASE_SEPOLIA_CONFIG.chainIdHex }],
    });
  } catch (error) {
    const errorCode =
      typeof error === "object" && error !== null && "code" in error
        ? (error as { code?: number }).code
        : undefined;

    if (errorCode !== 4902) {
      throw error;
    }

    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: BASE_SEPOLIA_CONFIG.chainIdHex,
          chainName: BASE_SEPOLIA_CONFIG.chainName,
          rpcUrls: [BASE_SEPOLIA_CONFIG.rpcUrl],
          blockExplorerUrls: [BASE_SEPOLIA_CONFIG.explorerBaseUrl],
          nativeCurrency: { ...BASE_SEPOLIA_CONFIG.nativeCurrency },
        },
      ],
    });
  }
}

export async function fetchNativeBalance(provider: BrowserWalletProvider, address: string) {
  const balanceHex = await provider.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  });

  if (typeof balanceHex !== "string") {
    return null;
  }

  return Number(ethers.formatEther(BigInt(balanceHex)));
}

export function getDemoContracts(runner: ethers.ContractRunner) {
  if (!hasConfiguredDemoContracts()) {
    throw new Error("Contract addresses are missing from the frontend environment.");
  }

  return {
    carbonCredit: new ethers.Contract(
      DEMO_CONTRACT_ADDRESSES.carbonCredit!,
      ERC1155_ABI,
      runner,
    ),
    marketplace: new ethers.Contract(
      DEMO_CONTRACT_ADDRESSES.marketplace!,
      MARKETPLACE_ABI,
      runner,
    ),
    retirementAgent: new ethers.Contract(
      DEMO_CONTRACT_ADDRESSES.retirementAgent!,
      RETIREMENT_AGENT_ABI,
      runner,
    ),
    settlementToken: new ethers.Contract(
      DEMO_CONTRACT_ADDRESSES.settlementToken!,
      ERC20_ABI,
      runner,
    ),
  };
}
