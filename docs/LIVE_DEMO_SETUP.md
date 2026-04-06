# CarbonRoot Live Demo Setup

## Goal
Run one real Base Sepolia demo from start to finish:

1. connect the buyer wallet
2. approve MockUSDT
3. buy CRT
4. retire CRT
5. open the certificate page with real hashes

## Wallets Needed
- Deployer wallet: deploys the contracts
- Project wallet: holds the initial project supply
- Buyer wallet: approves MockUSDT, buys CRT, retires CRT

## Free Funding
Give free Base Sepolia ETH to:
- the deployer wallet
- the buyer wallet

This ETH is only for gas.

Official Base references:
- Network setup: https://docs.base.org/base-chain/quickstart/connecting-to-base
- Faucet list: https://docs.base.org/base-chain/network-information/network-faucets

## Contract Setup

### 1. Create the contract env file
Copy:

`contracts/.env.example` -> `contracts/.env.local`

### 2. Fill these values
- `BASE_SEPOLIA_RPC_URL`
- `DEPLOYER_PRIVATE_KEY`
- `TREASURY_ADDRESS`
- `USDT_ADDRESS`
- `INITIAL_PROJECT_DEVELOPER`
- `INITIAL_BUYER_ADDRESS`

## Frontend Setup

### 1. Create the frontend env file
Copy:

`.env.example` -> `.env.local`

### 2. Fill these values after deployment
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_CHAIN_NAME`
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL`
- `NEXT_PUBLIC_CARBON_CREDIT_ADDRESS`
- `NEXT_PUBLIC_MARKETPLACE_ADDRESS`
- `NEXT_PUBLIC_RETIREMENT_AGENT_ADDRESS`
- `NEXT_PUBLIC_SETTLEMENT_TOKEN_ADDRESS`

## Install and Build

### Contracts
From `contracts/`:

```bash
npm install
npm run build
```

### Frontend
From the project root:

```bash
npm install
npm run build
```

## Deploy
From `contracts/`:

```bash
npm run deploy:base-sepolia
```

Save the deployed addresses for:
- CarbonCredit
- Marketplace
- RetirementAgent
- SettlementToken

Add those to the root `.env.local`.

## Live Demo Walkthrough

### 1. Start the frontend
From the project root:

```bash
npm run dev
```

### 2. Connect the buyer wallet
Open the buy flow and connect the funded buyer wallet on Base Sepolia.

### 3. Approve MockUSDT
This gives the marketplace contract permission to charge the buyer wallet.

### 4. Buy CRT
This creates a real purchase transaction and moves credits to the buyer wallet.

### 5. Retire CRT
This creates a real retirement transaction and burns the buyer’s credits.

### 6. Open the certificate
The certificate page should show:
- the project
- the retired amount
- the approval hash
- the purchase hash
- the retirement hash

## Success Checklist
- contracts compile
- frontend builds
- deployment succeeds
- buyer receives test ETH and MockUSDT
- approval succeeds
- purchase succeeds
- retirement succeeds
- certificate links point to real explorer entries

## Troubleshooting
- If contracts do not compile, check `contracts/.env.local` first
- If the frontend cannot transact, verify the root `.env.local` addresses
- If the wallet connects but actions fail, confirm the wallet is on Base Sepolia
