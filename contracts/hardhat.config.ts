import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";

dotenv.config({ path: ".env.local" });

const privateKey = process.env.DEPLOYER_PRIVATE_KEY?.trim();
const rpcUrl = process.env.BASE_SEPOLIA_RPC_URL || process.env.BSC_TESTNET_RPC_URL;
const normalizedPrivateKey = privateKey
  ? privateKey.startsWith("0x")
    ? privateKey
    : `0x${privateKey}`
  : null;
const hasValidPrivateKey = normalizedPrivateKey
  ? /^0x[a-fA-F0-9]{64}$/.test(normalizedPrivateKey)
  : false;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    baseSepolia: {
      url: rpcUrl || "",
      chainId: 84532,
      accounts: hasValidPrivateKey && normalizedPrivateKey ? [normalizedPrivateKey] : [],
    },
  },
};

export default config;
