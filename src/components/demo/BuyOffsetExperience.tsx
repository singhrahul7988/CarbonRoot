"use client";

import Link from "next/link";
import { ethers } from "ethers";
import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleHelp,
  ExternalLink,
  FileText,
  Flame,
  Landmark,
  LayoutDashboard,
  Leaf,
  Settings,
  ShieldCheck,
  Wallet,
  WalletCards,
  X,
} from "lucide-react";
import type { WheelEvent } from "react";

import styles from "./BuyOffsetExperience.module.css";
import { PROJECTS_BY_SLUG } from "@/lib/projects";
import { DEMO_CONTRACT_ADDRESSES, hasConfiguredDemoContracts } from "@/lib/web3/addresses";
import { BASE_SEPOLIA_CONFIG, buildExplorerTxUrl } from "@/lib/web3/config";
import {
  createBrowserProvider,
  ensureBaseSepolia,
  fetchNativeBalance,
  getDemoContracts,
  getInjectedProvider,
} from "@/lib/web3/contracts";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Leaf, label: "Projects", active: true },
  { icon: Landmark, label: "Ledger" },
  { icon: BadgeCheck, label: "Certificates" },
  { icon: Settings, label: "Settings" },
];

const DEFAULT_RETIREMENT_PURPOSE = "Operational emissions offset";
const WALLET_DISCONNECTED_KEY = "carbonroot.wallet.disconnected";

type BuyOffsetExperienceProps = {
  initialAmount: number;
  initialMode: "marketplace" | "compliance";
  initialProjectSlug: string;
};

type RuntimeTransactionState = {
  projectSlug: string;
  amount: number;
  approvalHash: string | null;
  purchaseHash: string | null;
  retirementHash: string | null;
};

function formatCredits(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatShortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function normalizeCreditInput(rawValue: string, maxValue: number) {
  const parsedValue = Number.parseInt(rawValue, 10);

  if (Number.isNaN(parsedValue)) {
    return 0;
  }

  return Math.max(0, Math.min(maxValue, parsedValue));
}

function handleNumberInputWheel(event: WheelEvent<HTMLInputElement>) {
  event.currentTarget.blur();
}

function getProviderErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "Wallet connection failed. Check the browser wallet and try again.";
}

export function BuyOffsetExperience({
  initialAmount,
  initialMode,
  initialProjectSlug,
}: BuyOffsetExperienceProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"marketplace" | "compliance">(initialMode);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletStatus, setWalletStatus] = useState<"disconnected" | "connecting" | "connected">(
    "disconnected",
  );
  const [walletAutoconnectBlocked, setWalletAutoconnectBlocked] = useState(false);
  const [walletBalanceEth, setWalletBalanceEth] = useState<number | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [availableCredits, setAvailableCredits] = useState(0);
  const [ownedCredits, setOwnedCredits] = useState(0);
  const [listingActive, setListingActive] = useState(true);
  const [listingDeveloper, setListingDeveloper] = useState<string | null>(null);
  const [unitPriceRaw, setUnitPriceRaw] = useState<bigint>(ethers.parseUnits("0", 6));
  const [settlementAllowance, setSettlementAllowance] = useState<bigint>(BigInt(0));
  const [activeStage, setActiveStage] = useState<"buy" | "retire">("buy");
  const [buyDraftAmount, setBuyDraftAmount] = useState("0");
  const [retireDraftAmount, setRetireDraftAmount] = useState("0");
  const [isApproving, setIsApproving] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRetiring, setIsRetiring] = useState(false);
  const [transactionState, setTransactionState] = useState<RuntimeTransactionState>({
    projectSlug: initialProjectSlug,
    amount: Math.max(1, Math.trunc(initialAmount)),
    approvalHash: null,
    purchaseHash: null,
    retirementHash: null,
  });

  const deferredBuyDraftAmount = useDeferredValue(buyDraftAmount);
  const deferredRetireDraftAmount = useDeferredValue(retireDraftAmount);
  const project = PROJECTS_BY_SLUG[initialProjectSlug] ?? PROJECTS_BY_SLUG["luangwa-valley"];
  const contractsConfigured = hasConfiguredDemoContracts();

  useEffect(() => {
    setAvailableCredits(project.availableCredits);
    setOwnedCredits(0);
    setListingActive(true);
    setListingDeveloper(null);
    setUnitPriceRaw(ethers.parseUnits(project.unitPriceUsd.toFixed(2), 6));
    setSettlementAllowance(BigInt(0));
    setActiveStage("buy");
    setBuyDraftAmount(String(Math.max(1, Math.min(100, Math.trunc(initialAmount), project.availableCredits))));
    setRetireDraftAmount("0");
    setIsApproving(false);
    setIsPurchasing(false);
    setIsRetiring(false);
    setActionError(null);
    setTransactionState({
      projectSlug: project.slug,
      amount: Math.max(1, Math.trunc(initialAmount)),
      approvalHash: null,
      purchaseHash: null,
      retirementHash: null,
    });
  }, [initialAmount, project.availableCredits, project.slug, project.unitPriceUsd]);

  const buyAmount = useMemo(
    () => normalizeCreditInput(deferredBuyDraftAmount, availableCredits),
    [availableCredits, deferredBuyDraftAmount],
  );

  const retireAmount = useMemo(
    () => normalizeCreditInput(deferredRetireDraftAmount, ownedCredits),
    [deferredRetireDraftAmount, ownedCredits],
  );

  const unitPriceUsd = useMemo(() => Number(ethers.formatUnits(unitPriceRaw, 6)), [unitPriceRaw]);
  const purchaseTotalRaw = useMemo(() => unitPriceRaw * BigInt(buyAmount), [buyAmount, unitPriceRaw]);
  const purchaseTotal = useMemo(
    () => Number(ethers.formatUnits(purchaseTotalRaw, 6)),
    [purchaseTotalRaw],
  );
  const projectedOwnedBalance = useMemo(() => ownedCredits + buyAmount, [buyAmount, ownedCredits]);

  const walletReady = walletStatus === "connected" && walletAddress !== null;
  const approvalRequired = purchaseTotalRaw > BigInt(0) && settlementAllowance < purchaseTotalRaw;
  const canApprove =
    walletReady &&
    contractsConfigured &&
    listingActive &&
    buyAmount > 0 &&
    buyAmount <= availableCredits &&
    approvalRequired &&
    !isApproving &&
    !isPurchasing;
  const canPurchase =
    walletReady &&
    contractsConfigured &&
    listingActive &&
    buyAmount > 0 &&
    buyAmount <= availableCredits &&
    !approvalRequired &&
    !isApproving &&
    !isPurchasing;
  const canRetire =
    walletReady &&
    contractsConfigured &&
    retireAmount > 0 &&
    retireAmount <= ownedCredits &&
    !isRetiring;

  const refreshOnchainData = useCallback(async (address: string) => {
    const provider = getInjectedProvider();

    if (!provider || !contractsConfigured) {
      return;
    }

    const browserProvider = createBrowserProvider(provider);
    const contracts = getDemoContracts(browserProvider);
    const listing = await contracts.marketplace.listings(project.tokenId);
    const developerAddress = String(listing.developer);
    const active = Boolean(listing.active);
    const currentUnitPrice = BigInt(listing.unitPrice);

    const [developerBalance, buyerBalance, allowance, nativeBalance] = await Promise.all([
      contracts.carbonCredit.balanceOf(developerAddress, project.tokenId),
      contracts.carbonCredit.balanceOf(address, project.tokenId),
      contracts.settlementToken.allowance(address, DEMO_CONTRACT_ADDRESSES.marketplace!),
      fetchNativeBalance(provider, address),
    ]);

    setListingDeveloper(developerAddress);
    setListingActive(active);
    setUnitPriceRaw(currentUnitPrice);
    setAvailableCredits(Number(developerBalance));
    setOwnedCredits(Number(buyerBalance));
    setSettlementAllowance(BigInt(allowance));
    setWalletBalanceEth(nativeBalance);
  }, [contractsConfigured, project.tokenId]);

  const syncWallet = useCallback(async (address: string) => {
    const provider = getInjectedProvider();

    if (!provider) {
      return;
    }

    setWalletAddress(address);
    setWalletStatus("connected");
    setWalletError(null);

    try {
      await refreshOnchainData(address);
      setActionError(null);
    } catch (error) {
      setActionError(getProviderErrorMessage(error));
    }
  }, [refreshOnchainData]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setWalletAutoconnectBlocked(
      window.sessionStorage.getItem(WALLET_DISCONNECTED_KEY) === "true",
    );
  }, []);

  useEffect(() => {
    const provider = getInjectedProvider();

    if (!provider || walletAutoconnectBlocked) {
      return;
    }

    const bootstrapWallet = async () => {
      try {
        const accounts = await provider.request({ method: "eth_accounts" });

        if (Array.isArray(accounts) && typeof accounts[0] === "string") {
          await syncWallet(accounts[0]);
        }
      } catch {
        // Silent bootstrap only.
      }
    };

    const handleAccountsChanged = (nextAccounts: unknown) => {
      if (Array.isArray(nextAccounts) && typeof nextAccounts[0] === "string") {
        void syncWallet(nextAccounts[0]);
        return;
      }

      setWalletAddress(null);
      setWalletBalanceEth(null);
      setWalletStatus("disconnected");
      setSettlementAllowance(BigInt(0));
      setOwnedCredits(0);
    };

    const handleChainChanged = () => {
      if (walletAddress) {
        void syncWallet(walletAddress);
      }
    };

    void bootstrapWallet();

    provider.on?.("accountsChanged", handleAccountsChanged);
    provider.on?.("chainChanged", handleChainChanged);

    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged);
      provider.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [syncWallet, walletAddress, walletAutoconnectBlocked, project.tokenId]);

  const handleModeChange = (nextMode: "marketplace" | "compliance") => {
    setMode(nextMode);
    startTransition(() => {
      router.replace(
        `/buy-offset?mode=${nextMode}&amount=${buyAmount || 100}&project=${project.slug}`,
      );
    });
  };

  const handleWalletConnect = async () => {
    const provider = getInjectedProvider();

    if (!provider) {
      setWalletError("MetaMask or another browser wallet was not found in this browser.");
      window.open("https://metamask.io/download/", "_blank", "noopener,noreferrer");
      return;
    }

    setWalletStatus("connecting");
    setWalletError(null);
    setActionError(null);
    setWalletAutoconnectBlocked(false);

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(WALLET_DISCONNECTED_KEY);
    }

    try {
      await ensureBaseSepolia(provider);

      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const primaryAccount = Array.isArray(accounts) ? accounts[0] : null;

      if (typeof primaryAccount !== "string" || primaryAccount.length === 0) {
        throw new Error("No wallet account was returned by the provider.");
      }

      await syncWallet(primaryAccount);
      setWalletModalOpen(false);
    } catch (error) {
      setWalletStatus("disconnected");
      setWalletError(getProviderErrorMessage(error));
    }
  };

  const handleApprove = async () => {
    if (!canApprove) {
      return;
    }

    const provider = getInjectedProvider();

    if (!provider) {
      setActionError("A browser wallet is required before approving MockUSDT.");
      return;
    }

    try {
      setIsApproving(true);
      setActionError(null);

      await ensureBaseSepolia(provider);
      const browserProvider = createBrowserProvider(provider);
      const signer = await browserProvider.getSigner();
      const contracts = getDemoContracts(signer);
      const approveTx = await contracts.settlementToken.approve(
        DEMO_CONTRACT_ADDRESSES.marketplace!,
        purchaseTotalRaw,
      );
      await approveTx.wait();

      setTransactionState((currentValue) => ({
        ...currentValue,
        projectSlug: project.slug,
        amount: buyAmount,
        approvalHash: approveTx.hash,
      }));

      if (walletAddress) {
        await refreshOnchainData(walletAddress);
      }
    } catch (error) {
      setActionError(getProviderErrorMessage(error));
    } finally {
      setIsApproving(false);
    }
  };

  const handlePurchase = async () => {
    if (!canPurchase) {
      return;
    }

    const provider = getInjectedProvider();

    if (!provider) {
      setActionError("A browser wallet is required before buying credits.");
      return;
    }

    try {
      setIsPurchasing(true);
      setActionError(null);

      await ensureBaseSepolia(provider);
      const browserProvider = createBrowserProvider(provider);
      const signer = await browserProvider.getSigner();
      const contracts = getDemoContracts(signer);
      const purchaseTx = await contracts.marketplace.purchaseCredits(project.tokenId, buyAmount);
      await purchaseTx.wait();

      setTransactionState((currentValue) => ({
        ...currentValue,
        projectSlug: project.slug,
        amount: buyAmount,
        purchaseHash: purchaseTx.hash,
      }));

      if (walletAddress) {
        await refreshOnchainData(walletAddress);
      }

      setRetireDraftAmount(String(buyAmount));
      setActiveStage("retire");
    } catch (error) {
      setActionError(getProviderErrorMessage(error));
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAutoconnectBlocked(true);
    setWalletAddress(null);
    setWalletBalanceEth(null);
    setWalletStatus("disconnected");
    setWalletError(null);
    setActionError(null);
    setSettlementAllowance(BigInt(0));

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(WALLET_DISCONNECTED_KEY, "true");
    }

    setAvailableCredits(project.availableCredits);
    setOwnedCredits(0);
    setListingDeveloper(null);
    setListingActive(true);
    setUnitPriceRaw(ethers.parseUnits(project.unitPriceUsd.toFixed(2), 6));
    setActiveStage("buy");
    setBuyDraftAmount(String(Math.max(1, Math.min(100, Math.trunc(initialAmount), project.availableCredits))));
    setRetireDraftAmount("0");
    setIsApproving(false);
    setIsPurchasing(false);
    setIsRetiring(false);
    setWalletModalOpen(false);
    setTransactionState({
      projectSlug: project.slug,
      amount: Math.max(1, Math.trunc(initialAmount)),
      approvalHash: null,
      purchaseHash: null,
      retirementHash: null,
    });
  };

  const handleRetire = async () => {
    if (!canRetire || !walletAddress) {
      return;
    }

    const provider = getInjectedProvider();

    if (!provider) {
      setActionError("A browser wallet is required before retiring credits.");
      return;
    }

    try {
      setIsRetiring(true);
      setActionError(null);

      await ensureBaseSepolia(provider);
      const browserProvider = createBrowserProvider(provider);
      const signer = await browserProvider.getSigner();
      const contracts = getDemoContracts(signer);
      const retirementTx = await contracts.retirementAgent.retireCredits(
        project.tokenId,
        retireAmount,
        walletAddress,
        DEFAULT_RETIREMENT_PURPOSE,
      );
      await retirementTx.wait();

      const nextTransactionState = {
        ...transactionState,
        projectSlug: project.slug,
        amount: retireAmount,
        retirementHash: retirementTx.hash,
      };

      setTransactionState(nextTransactionState);

      if (walletAddress) {
        await refreshOnchainData(walletAddress);
      }

      const certificateParams = new URLSearchParams({
        amount: String(retireAmount),
        fee: "0",
        mode,
        project: project.slug,
        purchaseHash: nextTransactionState.purchaseHash ?? "",
        retirementHash: retirementTx.hash,
        approvalHash: nextTransactionState.approvalHash ?? "",
      });

      router.push(`/certificate?${certificateParams.toString()}`);
    } catch (error) {
      setActionError(getProviderErrorMessage(error));
    } finally {
      setIsRetiring(false);
    }
  };

  const actionHint = !contractsConfigured
    ? "Add the deployed Base Sepolia addresses to NEXT_PUBLIC_* env values before running live transactions."
    : approvalRequired
      ? "Approve MockUSDT first so the marketplace can charge the buyer wallet."
      : "Buy credits first, then retire them to create the final certificate hash.";

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <div className={styles.sidebarLogo}>
            <Leaf size={20} />
          </div>
          <div>
            <p className={styles.sidebarTitle}>CarbonRoot</p>
            <p className={styles.sidebarSubtitle}>The Earth&apos;s Ledger</p>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {SIDEBAR_ITEMS.map(({ active, icon: Icon, label }) => (
            <button
              className={active ? styles.sidebarItemActive : styles.sidebarItem}
              key={label}
              type="button"
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.sidebarPrimaryAction} type="button">
            Retire CRT
          </button>

          <div className={styles.sidebarLinks}>
            <button className={styles.sidebarLink} type="button">
              <CircleHelp size={16} />
              <span>Support</span>
            </button>
            <button className={styles.sidebarLink} type="button">
              <FileText size={16} />
              <span>Documentation</span>
            </button>
          </div>
        </div>
      </aside>

      <div className={styles.mainShell}>
        <header className={styles.topbar}>
          <nav className={styles.topbarNav}>
            <span>Marketplace</span>
            <span>Portfolio</span>
            <span>Analytics</span>
            <span>Verification</span>
          </nav>

          <div className={styles.topbarMeta}>
            <div className={styles.balanceChip}>
              <Wallet size={18} />
              <span>{formatCredits(ownedCredits)} CRT owned</span>
            </div>

            <button
              className={walletReady ? styles.walletButtonConnected : styles.walletButton}
              onClick={() => setWalletModalOpen(true)}
              type="button"
            >
              <WalletCards size={18} />
              <span>
                {walletReady && walletAddress ? formatShortAddress(walletAddress) : "Connect Wallet"}
              </span>
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <section className={styles.hero}>
            <Link className={styles.backLink} href="/">
              <ArrowLeft size={16} />
              <span>Back to Landing Page</span>
            </Link>

            <div className={styles.heroMeta}>
              <span className={styles.kicker}>Verified Asset</span>
              <span className={styles.protocol}>Approve, buy, and retire on Base Sepolia</span>
            </div>

            <h1 className={styles.title}>Buy Carbon Credits</h1>
            <p className={styles.body}>
              Connect a Base Sepolia wallet, approve MockUSDT for the marketplace,
              buy CRT from live inventory, then burn owned CRT to create a real
              certificate backed by real transaction hashes.
            </p>
          </section>

          <div className={styles.layout}>
            <section className={styles.leftColumn}>
              <article className={styles.projectCard}>
                <div className={styles.projectMedia}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={project.title}
                    className={styles.projectImage}
                    src={project.image}
                  />
                  <div className={styles.projectShade} />
                  <div className={styles.projectOverlay}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className={styles.projectMeta}>
                      Project ID: {project.projectId} | Token ID {project.tokenId} | {project.location}
                    </p>
                  </div>
                </div>

                <div className={styles.projectFacts}>
                  <div>
                    <p className={styles.factLabel}>Standard</p>
                    <p className={styles.factValue}>{project.standard}</p>
                  </div>
                  <div>
                    <p className={styles.factLabel}>Unit Price</p>
                    <p className={styles.factValue}>{formatCurrency(unitPriceUsd)}</p>
                  </div>
                  <div>
                    <p className={styles.factLabel}>Available CRT</p>
                    <p className={styles.factValue}>{formatCredits(availableCredits)}</p>
                  </div>
                </div>
              </article>

              <section className={styles.impactCard}>
                <h3 className={styles.sectionTitle}>Environmental Impact Analysis</h3>
                <div className={styles.impactGrid}>
                  <div className={styles.impactItem}>
                    <Leaf size={24} />
                    <div>
                      <strong>1.4k Hectares</strong>
                      <span>Native forest restoration</span>
                    </div>
                  </div>
                  <div className={styles.impactItem}>
                    <Building2 size={24} />
                    <div>
                      <strong>450 Families</strong>
                      <span>Sustainable livelihoods</span>
                    </div>
                  </div>
                  <div className={styles.impactItem}>
                    <Wallet size={24} />
                    <div>
                      <strong>{formatCredits(availableCredits)} CRT</strong>
                      <span>Current listed inventory</span>
                    </div>
                  </div>
                  <div className={styles.impactItem}>
                    <ShieldCheck size={24} />
                    <div>
                      <strong>{BASE_SEPOLIA_CONFIG.chainName}</strong>
                      <span>Default live demo chain</span>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            <aside className={styles.terminal}>
              <div className={styles.terminalTop}>
                <h3 className={styles.terminalHeading}>Purchase & Retire</h3>
                <span className={styles.terminalChip}>
                  {mode === "compliance" ? "Compliance Flow" : "Marketplace Flow"}
                </span>
              </div>

              <div className={styles.modeTabs}>
                <button
                  className={mode === "marketplace" ? styles.modeTabActive : styles.modeTab}
                  onClick={() => handleModeChange("marketplace")}
                  type="button"
                >
                  Marketplace
                </button>
                <button
                  className={mode === "compliance" ? styles.modeTabActive : styles.modeTab}
                  onClick={() => handleModeChange("compliance")}
                  type="button"
                >
                  Compliance
                </button>
              </div>

              <div className={styles.workflowStage}>
                <div className={styles.workflowViewport}>
                  <section
                    className={
                      activeStage === "buy"
                        ? `${styles.workflowScreen} ${styles.workflowScreenActive}`
                        : `${styles.workflowScreen} ${styles.workflowScreenLeft}`
                    }
                  >
                    <div className={styles.screenHeader}>
                      <h4 className={styles.stepTitle}>Approve & Buy CRT</h4>
                    </div>

                    <div className={styles.balanceCard}>
                      <div>
                        <p className={styles.factLabel}>Wallet status</p>
                        <p className={styles.balanceValueCompact}>
                          {walletReady && walletAddress ? formatShortAddress(walletAddress) : "Not connected"}
                        </p>
                        <p className={styles.balanceHelper}>
                          {walletBalanceEth !== null
                            ? `${walletBalanceEth.toFixed(4)} ETH gas balance`
                            : "Connect a browser wallet to continue"}
                        </p>
                      </div>
                      <button
                        className={styles.inlineButton}
                        onClick={() => setWalletModalOpen(true)}
                        type="button"
                      >
                        {walletReady ? "Manage Wallet" : "Connect Wallet"}
                      </button>
                    </div>

                    <div className={styles.inventoryGrid}>
                      <div className={styles.inventoryCard}>
                        <span>Available to buy</span>
                        <strong>{formatCredits(availableCredits)} CRT</strong>
                      </div>
                      <div className={styles.inventoryCard}>
                        <span>Price per credit</span>
                        <strong>{formatCurrency(unitPriceUsd)}</strong>
                      </div>
                      <div className={styles.inventoryCard}>
                        <span>Owned balance</span>
                        <strong>{formatCredits(ownedCredits)} CRT</strong>
                      </div>
                      <div className={styles.inventoryCard}>
                        <span>Listing wallet</span>
                        <strong>{listingDeveloper ? formatShortAddress(listingDeveloper) : "Loading..."}</strong>
                      </div>
                    </div>

                    <div className={styles.fieldBlock}>
                      <label className={styles.inputLabel} htmlFor="buy-amount">
                        Buy amount (CRT)
                      </label>
                      <div className={styles.inputShell}>
                        <input
                          className={styles.input}
                          id="buy-amount"
                          inputMode="numeric"
                          min="1"
                          onChange={(event) => setBuyDraftAmount(event.target.value)}
                          onWheel={handleNumberInputWheel}
                          placeholder="0"
                          step="1"
                          type="number"
                          value={buyDraftAmount}
                        />
                        <span className={styles.inputSuffix}>CRT</span>
                      </div>
                      <div className={styles.inputMeta}>
                        <span>Total cost: {formatCurrency(purchaseTotal)}</span>
                        <span>Allowance: {formatCurrency(Number(ethers.formatUnits(settlementAllowance, 6)))}</span>
                      </div>
                    </div>

                    <div className={styles.summaryCard}>
                      <div className={styles.summaryRow}>
                        <span>Projected owned balance</span>
                        <strong>{formatCredits(projectedOwnedBalance)} CRT</strong>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Remaining project inventory</span>
                        <strong>{formatCredits(Math.max(availableCredits - buyAmount, 0))} CRT</strong>
                      </div>
                    </div>

                    {!listingActive ? (
                      <p className={styles.disclaimer}>This project listing is not active on-chain yet.</p>
                    ) : null}

                    {!contractsConfigured ? (
                      <p className={styles.disclaimer}>{actionHint}</p>
                    ) : null}

                    {contractsConfigured ? (
                      <button
                        className={styles.primaryAction}
                        disabled={approvalRequired ? !canApprove : !canPurchase}
                        onClick={approvalRequired ? handleApprove : handlePurchase}
                        type="button"
                      >
                        <WalletCards size={18} />
                        <span>
                          {isApproving
                            ? "Approving MockUSDT..."
                            : isPurchasing
                              ? "Buying CRT..."
                              : approvalRequired
                                ? "Approve MockUSDT"
                                : "Buy CRT from wallet"}
                        </span>
                      </button>
                    ) : null}

                    {transactionState.approvalHash ? (
                      <p className={styles.disclaimer}>
                        Approval hash:{" "}
                        <a href={buildExplorerTxUrl(transactionState.approvalHash)} rel="noreferrer" target="_blank">
                          {formatShortAddress(transactionState.approvalHash)}
                        </a>
                      </p>
                    ) : null}
                  </section>
                  <section
                    className={
                      activeStage === "retire"
                        ? `${styles.workflowScreen} ${styles.workflowScreenActive}`
                        : `${styles.workflowScreen} ${styles.workflowScreenRight}`
                    }
                  >
                    <div className={styles.screenHeader}>
                      <h4 className={styles.stepTitle}>Retire CRT</h4>
                      <button
                        className={styles.ghostButton}
                        onClick={() => setActiveStage("buy")}
                        type="button"
                      >
                        Buy More
                      </button>
                    </div>

                    <div className={styles.balanceCard}>
                      <div>
                        <p className={styles.factLabel}>Carbon credit balance</p>
                        <p className={styles.balanceValue}>
                          {formatCredits(ownedCredits)} <span>CRT</span>
                        </p>
                      </div>
                      <span className={styles.balanceHelper}>Ready to burn for a real retirement proof</span>
                    </div>

                    <div className={styles.fieldBlock}>
                      <label className={styles.inputLabel} htmlFor="retirement-amount">
                        Burn amount (CRT)
                      </label>
                      <div className={styles.inputShell}>
                        <input
                          className={styles.input}
                          id="retirement-amount"
                          inputMode="numeric"
                          min="1"
                          onChange={(event) => setRetireDraftAmount(event.target.value)}
                          onWheel={handleNumberInputWheel}
                          placeholder="0"
                          step="1"
                          type="number"
                          value={retireDraftAmount}
                        />
                        <span className={styles.inputSuffix}>CRT</span>
                      </div>
                      <div className={styles.inputMeta}>
                        <span>1 CRT = 1 mtCO2e in this demo</span>
                        <span>Purpose: {DEFAULT_RETIREMENT_PURPOSE}</span>
                      </div>
                    </div>

                    <div className={styles.summaryCard}>
                      <div className={styles.summaryRow}>
                        <span>Purchase transaction</span>
                        <strong>
                          {transactionState.purchaseHash
                            ? formatShortAddress(transactionState.purchaseHash)
                            : "Pending"}
                        </strong>
                      </div>
                      <div className={styles.summaryTotal}>
                        <span>Total retirement</span>
                        <div className={styles.summaryAmount}>
                          <strong>{formatCredits(retireAmount)}</strong>
                          <p>Metric tons carbon dioxide eq.</p>
                        </div>
                      </div>
                    </div>

                    <button
                      className={styles.primaryAction}
                      disabled={!canRetire}
                      onClick={handleRetire}
                      type="button"
                    >
                      <Flame size={18} />
                      <span>
                        {isRetiring ? "Retiring CRT on-chain..." : "Retire CRT for certificate"}
                      </span>
                    </button>

                    <p className={styles.disclaimer}>{actionHint}</p>
                  </section>
                </div>
              </div>

              {actionError ? <p className={styles.disclaimer}>{actionError}</p> : null}
            </aside>
          </div>
        </main>
      </div>

      {walletModalOpen ? (
        <div
          aria-hidden="true"
          className={styles.walletModalBackdrop}
          onClick={() => setWalletModalOpen(false)}
        >
          <div
            aria-label="Wallet connection modal"
            aria-modal="true"
            className={styles.walletModal}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className={styles.walletModalHeader}>
              <div>
                <p className={styles.walletModalEyebrow}>Wallet connection</p>
                <h4 className={styles.walletModalTitle}>Connect a Base Sepolia wallet</h4>
              </div>
              <button
                aria-label="Close wallet modal"
                className={styles.walletModalClose}
                onClick={() => setWalletModalOpen(false)}
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <p className={styles.walletModalCopy}>
              Select MetaMask or another injected browser wallet, then switch to
              {` ${BASE_SEPOLIA_CONFIG.chainName} `}so the demo can approve MockUSDT,
              buy CRT, and retire it on the live testnet.
            </p>

            <button
              className={styles.walletOption}
              onClick={handleWalletConnect}
              type="button"
            >
              <div className={styles.walletOptionIcon}>
                <WalletCards size={18} />
              </div>
              <div className={styles.walletOptionContent}>
                <strong>MetaMask / Injected Wallet</strong>
                <span>Connect extension wallet and add Base Sepolia if needed</span>
              </div>
              <ExternalLink size={16} />
            </button>

            <a
              className={styles.walletOptionSecondary}
              href="https://metamask.io/download/"
              rel="noreferrer"
              target="_blank"
            >
              <span>Install MetaMask first</span>
              <ExternalLink size={16} />
            </a>

            {walletError ? <p className={styles.walletError}>{walletError}</p> : null}

            {walletReady && walletAddress ? (
              <div className={styles.walletManagerCard}>
                <p className={styles.walletManagerLabel}>Connected wallet</p>
                <p className={styles.walletManagerAddress}>{walletAddress}</p>
                <div className={styles.walletManagerActions}>
                  <button
                    className={styles.inlineButton}
                    onClick={handleWalletConnect}
                    type="button"
                  >
                    Refresh Connection
                  </button>
                  <button
                    className={styles.ghostButton}
                    onClick={handleDisconnectWallet}
                    type="button"
                  >
                    Remove Current Wallet
                  </button>
                </div>
              </div>
            ) : null}

            <div className={styles.walletChecklist}>
              <div className={styles.walletChecklistItem}>
                <CheckCircle2 size={16} />
                <span>Network: {BASE_SEPOLIA_CONFIG.chainName}</span>
              </div>
              <div className={styles.walletChecklistItem}>
                <CheckCircle2 size={16} />
                <span>Chain ID: {BASE_SEPOLIA_CONFIG.chainId}</span>
              </div>
              <div className={styles.walletChecklistItem}>
                <CheckCircle2 size={16} />
                <span>Explorer: {BASE_SEPOLIA_CONFIG.explorerBaseUrl.replace("https://", "")}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
