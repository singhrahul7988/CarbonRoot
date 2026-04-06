function sanitizeAddress(value: string | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export const DEMO_CONTRACT_ADDRESSES = {
  carbonCredit: sanitizeAddress(process.env.NEXT_PUBLIC_CARBON_CREDIT_ADDRESS),
  marketplace: sanitizeAddress(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS),
  retirementAgent: sanitizeAddress(process.env.NEXT_PUBLIC_RETIREMENT_AGENT_ADDRESS),
  settlementToken: sanitizeAddress(process.env.NEXT_PUBLIC_SETTLEMENT_TOKEN_ADDRESS),
} as const;

export function hasConfiguredDemoContracts() {
  return Boolean(
    DEMO_CONTRACT_ADDRESSES.carbonCredit &&
      DEMO_CONTRACT_ADDRESSES.marketplace &&
      DEMO_CONTRACT_ADDRESSES.retirementAgent &&
      DEMO_CONTRACT_ADDRESSES.settlementToken,
  );
}
