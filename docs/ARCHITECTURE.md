# CarbonRoot Architecture

## Current Stack
- Frontend: Next.js 15 App Router + TypeScript
- Styling and interaction: CSS modules, GSAP, Lenis, Lucide
- Web3 client: `ethers` v6 with injected browser wallets
- Contracts: Hardhat + Solidity + OpenZeppelin
- Demo chain: Base Sepolia
- Settlement token for demo: MockUSDT

## Live Demo Flow
The current intended real flow is:

`approve MockUSDT -> buy CRT -> retire CRT -> open certificate`

This is the shortest full path that proves the app works with real transactions and real hashes.

## Frontend Structure

### Main User Routes
- `/`: marketing landing page
- `/supply`: project discovery and trust context
- `/buy-offset`: live purchase and retirement flow
- `/certificate`: proof screen with transaction hashes
- `/project-submission`: seller-side intake shell

### Shared Project Data
The frontend demo uses a shared project dataset as the source of truth for:
- project title
- token ID
- price
- available credits
- registry and project reference

## Web3 Layer
The frontend web3 layer is split into:
- chain config
- contract addresses
- contract helpers

Purpose:
- keep wallet logic small
- keep contract calls centralized
- avoid mixing chain details into UI components

## Contract Structure

### CarbonCredit.sol
ERC-1155 contract where:
- one token ID represents one project
- one unit represents one carbon credit
- marketplace transfers project inventory to buyers
- retirement burns buyer-owned credits

### Marketplace.sol
Handles:
- project listings
- settlement token payment
- buyer purchase flow
- project inventory transfer

### RetirementAgent.sol
Handles:
- retirement call
- permanent burn path
- retirement event emission

### MockUSDT.sol
Used only for the public demo flow so the payment step can work without depending on third-party test tokens.

## Deployment Model
The deploy script is expected to:
- deploy MockUSDT if no token address is supplied
- mint test funds to the buyer wallet
- deploy the carbon credit contract
- deploy the marketplace
- deploy the retirement agent
- connect contract permissions
- mint demo project inventory
- create listings for the demo projects

## Environment Files

### Contract env
`contracts/.env.local`

Used for:
- Base Sepolia RPC
- deployer private key
- treasury wallet
- project wallet
- buyer wallet
- optional settlement token override

### Frontend env
`.env.local`

Used for:
- chain metadata
- explorer base URL
- deployed contract addresses

## Current Implementation Boundaries

### In scope now
- one real public testnet flow
- one buyer path
- real approval, purchase, and retirement hashes
- certificate page tied to those hashes

### Out of scope now
- production security hardening
- enterprise API layer
- full automated verification engine
- advanced analytics backends
- non-demo payment redesign

## Design Principle For The System
Every part of the architecture should support one clear product outcome:

the buyer can defend the retirement with simple, visible proof.
