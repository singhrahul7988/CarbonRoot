import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const PROJECT_LISTINGS = [
  {
    tokenId: 492,
    title: "Luangwa Valley Reforestation",
    initialSupply: 145_000,
    unitPriceUsd: "24.50",
    projectUri: "ipfs://carbonroot/projects/luangwa-valley.json",
  },
  {
    tokenId: 1184,
    title: "Amazonian Canopy Shield",
    initialSupply: 82_000,
    unitPriceUsd: "31.20",
    projectUri: "ipfs://carbonroot/projects/amazonian-canopy-shield.json",
  },
  {
    tokenId: 3301,
    title: "Oceanic Mangrove Initiative",
    initialSupply: 58_000,
    unitPriceUsd: "42.00",
    projectUri: "ipfs://carbonroot/projects/oceanic-mangrove-initiative.json",
  },
] as const;

async function deploySettlementToken() {
  const MockUSDT = await ethers.getContractFactory("MockUSDT");
  const mockUsdt = await MockUSDT.deploy();
  await mockUsdt.waitForDeployment();

  const mockUsdtAddress = await mockUsdt.getAddress();
  console.log("MockUSDT:", mockUsdtAddress);

  const buyerAddress = process.env.INITIAL_BUYER_ADDRESS;

  if (buyerAddress) {
    const buyerMintAmount = ethers.parseUnits("250000", 6);
    await (await mockUsdt.mint(buyerAddress, buyerMintAmount)).wait();
    console.log(
      `MockUSDT buyer funding: ${buyerAddress} received ${ethers.formatUnits(buyerMintAmount, 6)} tUSDT`,
    );
  } else {
    console.log(
      "MockUSDT buyer funding skipped because INITIAL_BUYER_ADDRESS is not set in contracts/.env.local",
    );
  }

  return mockUsdtAddress;
}

async function main() {
  const treasury = process.env.TREASURY_ADDRESS;
  const configuredUsdtAddress = process.env.USDT_ADDRESS;
  const projectDeveloper = process.env.INITIAL_PROJECT_DEVELOPER;

  if (!treasury || !projectDeveloper) {
    throw new Error(
      "TREASURY_ADDRESS and INITIAL_PROJECT_DEVELOPER must be set in contracts/.env.local",
    );
  }

  const settlementTokenAddress = configuredUsdtAddress || (await deploySettlementToken());

  const CarbonCredit = await ethers.getContractFactory("CarbonCredit");
  const carbonCredit = await CarbonCredit.deploy();
  await carbonCredit.waitForDeployment();

  const carbonCreditAddress = await carbonCredit.getAddress();

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(carbonCreditAddress, settlementTokenAddress, treasury);
  await marketplace.waitForDeployment();

  const marketplaceAddress = await marketplace.getAddress();

  const RetirementAgent = await ethers.getContractFactory("RetirementAgent");
  const retirementAgent = await RetirementAgent.deploy(carbonCreditAddress);
  await retirementAgent.waitForDeployment();

  const retirementAgentAddress = await retirementAgent.getAddress();

  await (await carbonCredit.setMarketplace(marketplaceAddress)).wait();
  await (await carbonCredit.setRetirementAgent(retirementAgentAddress)).wait();

  for (const listing of PROJECT_LISTINGS) {
    await (await carbonCredit.setProjectUri(listing.tokenId, listing.projectUri)).wait();
    await (
      await carbonCredit.mintPhase1(
        listing.tokenId,
        listing.initialSupply,
        projectDeveloper,
      )
    ).wait();
    await (
      await marketplace.configureListing(
        listing.tokenId,
        projectDeveloper,
        ethers.parseUnits(listing.unitPriceUsd, 6),
      )
    ).wait();

    console.log(
      `Listing ready: tokenId=${listing.tokenId} title="${listing.title}" supply=${listing.initialSupply} unitPrice=${listing.unitPriceUsd} USDT`,
    );
  }

  console.log("CarbonCredit:", carbonCreditAddress);
  console.log("Marketplace:", marketplaceAddress);
  console.log("RetirementAgent:", retirementAgentAddress);
  console.log("SettlementToken:", settlementTokenAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
