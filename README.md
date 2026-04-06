# CarbonRoot

CarbonRoot is a trust-first carbon credit buying and retirement demo.
It lets a buyer discover a listed project, approve demo funds, buy credits,
retire them on-chain, and view a certificate page with real transaction hashes.

The current demo target is Base Sepolia.

## What It Includes

- A Next.js frontend for the marketing site and buyer flow
- A live demo flow: `approve MockUSDT -> buy CRT -> retire CRT -> certificate`
- A Hardhat contract workspace for deployment and testnet setup
- Focused project docs for product, architecture, design, and setup

## Current Stage

The product is in live-demo mode, not production mode.

What is already here:
- marketing and product pages
- shared project catalog
- buyer flow and certificate flow
- contract workspace and deploy script

What still depends on your setup:
- filling env files
- funding wallets with Base Sepolia ETH
- deploying contracts
- adding deployed addresses back into the frontend

## Tech Stack

- Frontend: Next.js 15, React 19, TypeScript
- Styling and motion: CSS, GSAP, Lenis
- Web3 client: `ethers` v6
- Contracts: Solidity, Hardhat, OpenZeppelin
- Demo chain: Base Sepolia
- Demo payment token: MockUSDT

## Repository Structure

```text
.
├─ docs/                    Project and setup documentation
├─ contracts/               Hardhat workspace and Solidity contracts
├─ src/app/                 App Router pages
├─ src/components/          UI, layout, sections, demo, compliance, submission
├─ src/lib/                 Shared data, motion helpers, web3 helpers
└─ .env.example             Frontend environment template
```

## Prerequisites

- Node.js 20+
- npm
- A browser wallet such as MetaMask
- Base Sepolia test ETH for real demo transactions

## Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Create the frontend env file:

```bash
cp .env.example .env.local
```

3. Fill these values:

- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_CHAIN_NAME`
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_BLOCK_EXPLORER_BASE_URL`
- `NEXT_PUBLIC_CARBON_CREDIT_ADDRESS`
- `NEXT_PUBLIC_MARKETPLACE_ADDRESS`
- `NEXT_PUBLIC_RETIREMENT_AGENT_ADDRESS`
- `NEXT_PUBLIC_SETTLEMENT_TOKEN_ADDRESS`

4. Start the app:

```bash
npm run dev
```

5. Build for a production check:

```bash
npm run build
```

## Contract Setup

From `contracts/`:

1. Install dependencies:

```bash
npm install
```

2. Create the contract env file:

```bash
cp .env.example .env.local
```

3. Fill these values:

- `BASE_SEPOLIA_RPC_URL`
- `DEPLOYER_PRIVATE_KEY`
- `TREASURY_ADDRESS`
- `USDT_ADDRESS` (optional)
- `INITIAL_PROJECT_DEVELOPER`
- `INITIAL_BUYER_ADDRESS`

4. Compile:

```bash
npm run build
```

5. Deploy:

```bash
npm run deploy:base-sepolia
```

Save the deployed addresses and copy them into the root `.env.local`.

## Live Demo Flow

Once the contracts are deployed and the frontend env is filled:

1. Open the app
2. Connect the funded buyer wallet on Base Sepolia
3. Approve MockUSDT
4. Buy CRT
5. Retire CRT
6. Open the certificate page and verify the real hashes

## Useful Commands

From the project root:

```bash
npm run dev
npm run build
```

From `contracts/`:

```bash
npm run build
npm run deploy:base-sepolia
```

## Documentation

- [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md): product scope, audience, and positioning
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md): system shape, routes, contracts, and env boundaries
- [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md): visual direction and interaction rules
- [LIVE_DEMO_SETUP.md](./docs/LIVE_DEMO_SETUP.md): manual deployment and live-demo runbook

## Notes

- This repo is built to prove one real transaction flow on public testnet.
- It is not yet production-hardened.
- The product should be presented as a verified carbon procurement and retirement tool, not a speculative crypto product.
