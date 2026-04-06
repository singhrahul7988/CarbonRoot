"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Download,
  Flame,
  Leaf,
  Share2,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react";

import styles from "./DemoExperience.module.css";

type DemoMode = "marketplace" | "compliance";
type DemoView = "buy" | "certificate";

type CertificateSnapshot = {
  amount: number;
  fee: number;
  issuedAt: string;
  ledgerHash: string;
  serial: string;
};

type DemoContextValue = {
  openBuyOffset: (mode?: DemoMode) => void;
  openCertificate: () => void;
};

const DemoExperienceContext = createContext<DemoContextValue | null>(null);

const BUY_OFFSET_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC-FUXmcOEj00LcMEyVymYwB7l3wLC2T9QHrChkE0On6SpZvxcDryW4MeZMSI4UT9l1Oah1mRHuotkYVhfTAorDjZo8s4QRAsuPGZIlJRs7YfgAmJZ-sEzuucaqyNcjdl29xb78tdiKiYsOCeA28ubOgiKOFJ52cexo84BJ13GBpownYgGKcSucEhPgDr9CFUwZqeg5Vz7wFZdQ48HWc-oPiGumKJ3Jm1EC3qGHRLqra8xYhly7Mfaf1YU4ee20ejiqHGsVlZGyovs";

const DEFAULT_CERTIFICATE: CertificateSnapshot = {
  amount: 500,
  fee: 2.5,
  issuedAt: "October 24, 2024",
  ledgerHash: "0x82f...a9c2",
  serial: "CR-8839-2024-X",
};

function formatAmount(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function buildCertificateSnapshot(amount: number): CertificateSnapshot {
  const roundedAmount = Math.max(1, Math.min(12450, Number(amount.toFixed(2))));
  const fee = Number((roundedAmount * 0.005).toFixed(2));
  const serialSeed = Math.round(roundedAmount * 7.13);
  const hashSeed = Math.round(roundedAmount * 19.7)
    .toString(16)
    .padStart(4, "0");

  return {
    amount: roundedAmount,
    fee,
    issuedAt: "October 24, 2024",
    ledgerHash: `0x${hashSeed.slice(0, 3)}...a9c2`,
    serial: `CR-${String(8300 + serialSeed).slice(0, 4)}-2024-X`,
  };
}

function DemoOverlay({
  certificate,
  closeDemo,
  isOpen,
  isSubmitting,
  mode,
  openBuyOffset,
  view,
  onBurn,
}: {
  certificate: CertificateSnapshot;
  closeDemo: () => void;
  isOpen: boolean;
  isSubmitting: boolean;
  mode: DemoMode;
  openBuyOffset: (mode?: DemoMode) => void;
  view: DemoView;
  onBurn: (amount: number) => void;
}) {
  const [draftAmount, setDraftAmount] = useState(() => String(certificate.amount));
  const deferredDraftAmount = useDeferredValue(draftAmount);

  useEffect(() => {
    if (view === "buy") {
      setDraftAmount(String(certificate.amount));
    }
  }, [certificate.amount, view]);

  const parsedAmount = useMemo(() => {
    const nextValue = Number.parseFloat(deferredDraftAmount);
    if (Number.isNaN(nextValue)) {
      return 0;
    }

    return Math.max(0, Math.min(12450, nextValue));
  }, [deferredDraftAmount]);

  const liveFee = useMemo(() => Number((parsedAmount * 0.005).toFixed(2)), [parsedAmount]);
  const enterpriseMode = mode === "compliance";

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className={styles.overlay}
      onClick={closeDemo}
      role="dialog"
    >
      <div
        className={styles.shell}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.topBar}>
          <div className={styles.topBarCopy}>
            <span className={styles.kicker}>
              {view === "buy" ? "Core Capability Demo" : "Immutable Proof Demo"}
            </span>
            <h2 className={styles.topBarTitle}>
              {view === "buy" ? "Buy Offset" : "Certificate Issued"}
            </h2>
          </div>

          <div className={styles.topBarActions}>
            <button
              className={styles.topBarLink}
              onClick={() => openBuyOffset("marketplace")}
              type="button"
            >
              Buy Offset
            </button>
            <button
              className={styles.topBarLink}
              onClick={() => openBuyOffset("compliance")}
              type="button"
            >
              Compliance Flow
            </button>
            <button
              aria-label="Close demo"
              className={styles.closeButton}
              onClick={closeDemo}
              type="button"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {view === "buy" ? (
          <div className={styles.buyLayout}>
            <section className={styles.buyCanvas}>
              <div className={styles.projectHero}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Luangwa Valley Reforestation project"
                  className={styles.projectImage}
                  src={BUY_OFFSET_IMAGE}
                />
                <div className={styles.projectShade} />
                <div className={styles.projectOverlay}>
                  <span className={styles.statusChip}>Verified Asset</span>
                  <h3 className={styles.projectTitle}>Luangwa Valley Reforestation</h3>
                  <p className={styles.projectMeta}>Project ID: CR-ZMB-0492 · Zambia, Africa</p>
                </div>
              </div>

              <div className={styles.projectFacts}>
                <div>
                  <p className={styles.factLabel}>Standard</p>
                  <p className={styles.factValue}>Verra VCS + CCB</p>
                </div>
                <div>
                  <p className={styles.factLabel}>Vintage</p>
                  <p className={styles.factValue}>2022 - 2023</p>
                </div>
                <div>
                  <p className={styles.factLabel}>Status</p>
                  <p className={styles.factValue}>Active Supply</p>
                </div>
              </div>

              <div className={styles.impactGrid}>
                <div className={styles.impactItem}>
                  <Leaf size={20} />
                  <div>
                    <strong>1.4k Hectares</strong>
                    <span>Native forest restoration</span>
                  </div>
                </div>
                <div className={styles.impactItem}>
                  <Building2 size={20} />
                  <div>
                    <strong>450 Families</strong>
                    <span>Sustainable livelihoods</span>
                  </div>
                </div>
                <div className={styles.impactItem}>
                  <ShieldCheck size={20} />
                  <div>
                    <strong>12 Red List</strong>
                    <span>Species protected</span>
                  </div>
                </div>
              </div>
            </section>

            <aside className={styles.buyRail}>
              <div className={styles.railHeader}>
                <div>
                  <span className={styles.kicker}>Retirement Protocol</span>
                  <h3 className={styles.railTitle}>
                    {enterpriseMode ? "Enterprise retirement workflow" : "Instant retirement terminal"}
                  </h3>
                </div>
                <span className={styles.modePill}>
                  {enterpriseMode ? "Compliance Mode" : "Marketplace Mode"}
                </span>
              </div>

              <div className={styles.balanceCard}>
                <div>
                  <p className={styles.factLabel}>Available Balance</p>
                  <p className={styles.balanceValue}>
                    12,450.00 <span>CRT</span>
                  </p>
                </div>
                <div className={styles.balanceMeta}>
                  <Wallet size={18} />
                  <span>Hot wallet ready</span>
                </div>
              </div>

              <div className={styles.fieldBlock}>
                <label className={styles.fieldLabel} htmlFor="retirement-amount">
                  Amount to Retire
                </label>
                <div className={styles.inputShell}>
                  <input
                    className={styles.amountInput}
                    id="retirement-amount"
                    inputMode="decimal"
                    onChange={(event) => setDraftAmount(event.target.value)}
                    placeholder="0.00"
                    type="number"
                    value={draftAmount}
                  />
                  <span className={styles.inputSuffix}>CRT</span>
                </div>
                <div className={styles.fieldMeta}>
                  <span>Fixed rate: 1 CRT = 1 mtCO2e</span>
                  <span>Max: 12,450.00</span>
                </div>
              </div>

              <div className={styles.summaryCard}>
                <div className={styles.summaryRow}>
                  <span>Service Fee (0.5%)</span>
                  <strong>{formatAmount(liveFee)} CRT</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>Project Allocation</span>
                  <strong>Luangwa Valley</strong>
                </div>
                <div className={styles.summaryTotal}>
                  <div>
                    <span>Total Retirement</span>
                    <strong>{formatAmount(parsedAmount)} mtCO2e</strong>
                  </div>
                  <BadgeCheck className={styles.summaryBadge} size={22} />
                </div>
              </div>

              <button
                className={styles.primaryAction}
                disabled={parsedAmount <= 0 || isSubmitting}
                onClick={() => onBurn(parsedAmount)}
                type="button"
              >
                <Flame size={18} />
                <span>
                  {isSubmitting ? "Writing to CarbonRoot ledger..." : "Burn Tokens to Retire Offset"}
                </span>
              </button>

              <p className={styles.disclaimer}>
                This demo simulates the irreversible burn transaction, certificate creation,
                and ledger writeback that CarbonRoot would execute for an enterprise offset
                retirement.
              </p>
            </aside>
          </div>
        ) : (
          <div className={styles.certificateLayout}>
            <div className={styles.certificatePaper}>
              <div className={styles.paperTop}>
                <div>
                  <p className={styles.factLabel}>Serial Number</p>
                  <p className={styles.paperMetaValue}>{certificate.serial}</p>
                </div>
                <div className={styles.paperMetaRight}>
                  <p className={styles.factLabel}>Issue Date</p>
                  <p className={styles.paperMetaValue}>{certificate.issuedAt}</p>
                </div>
              </div>

              <div className={styles.paperBody}>
                <span className={styles.statusChip}>Transaction Verified</span>
                <h3 className={styles.certificateTitle}>Certificate of Retirement</h3>
                <p className={styles.certificateLead}>Issued to Global Logistics Corp</p>
                <p className={styles.certificateCopy}>
                  CarbonRoot confirms that the following carbon credits were permanently
                  retired from the global ledger against the Luangwa Valley Reforestation
                  supply pool.
                </p>

                <div className={styles.impactBlock}>
                  <span className={styles.factLabel}>Total Impact Volume</span>
                  <strong>{formatAmount(certificate.amount)}</strong>
                  <span>mtCO2e</span>
                </div>

                <div className={styles.paperGrid}>
                  <div className={styles.paperInfo}>
                    <span className={styles.factLabel}>Registry</span>
                    <strong>Verra Carbon Standard</strong>
                    <span>Project ID: VCS-1922</span>
                  </div>
                  <div className={styles.paperInfo}>
                    <span className={styles.factLabel}>Ledger Hash</span>
                    <strong>{certificate.ledgerHash}</strong>
                    <span>Permanent write confirmed</span>
                  </div>
                  <div className={styles.paperInfo}>
                    <span className={styles.factLabel}>Verification</span>
                    <strong>CarbonRoot Audits</strong>
                    <span>Gold-standard retirement proof</span>
                  </div>
                </div>

                <div className={styles.paperFooter}>
                  <div className={styles.qrBlock}>
                    <div className={styles.qrShell} aria-hidden="true">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <span
                          className={`${styles.qrCell} ${index % 2 === 0 ? styles.qrCellBright : ""}`}
                          key={index}
                        />
                      ))}
                    </div>
                    <span className={styles.qrLabel}>Scan to verify ledger</span>
                  </div>

                  <div className={styles.signatureBlock}>
                    <p className={styles.signature}>E. Sterling</p>
                    <span className={styles.signatureLabel}>Authenticated by CarbonRoot Audits</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.certificateActions}>
              <button className={styles.primaryAction} type="button">
                <Download size={18} />
                <span>Download PDF</span>
              </button>
              <button className={styles.secondaryAction} type="button">
                <Share2 size={18} />
                <span>Share on LinkedIn</span>
              </button>
              <button
                className={styles.tertiaryAction}
                onClick={() => openBuyOffset("marketplace")}
                type="button"
              >
                <span>Return to Buy Offset</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function DemoExperienceProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<DemoMode>("marketplace");
  const [view, setView] = useState<DemoView>("buy");
  const [certificate, setCertificate] = useState<CertificateSnapshot>(DEFAULT_CERTIFICATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitTimerRef = useRef<number | null>(null);

  const closeDemo = useCallback(() => {
    setIsOpen(false);
    setIsSubmitting(false);
  }, []);

  const openBuyOffset = useCallback((nextMode: DemoMode = "marketplace") => {
    setMode(nextMode);
    setView("buy");
    setIsOpen(true);
  }, []);

  const openCertificate = useCallback(() => {
    setView("certificate");
    setIsOpen(true);
  }, []);

  const handleBurn = useCallback((amount: number) => {
    if (amount <= 0) {
      return;
    }

    setIsSubmitting(true);

    if (submitTimerRef.current) {
      window.clearTimeout(submitTimerRef.current);
    }

    submitTimerRef.current = window.setTimeout(() => {
      const nextCertificate = buildCertificateSnapshot(amount);

      startTransition(() => {
        setCertificate(nextCertificate);
        setView("certificate");
        setIsSubmitting(false);
      });
    }, 850);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDemo();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDemo, isOpen]);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const contextValue = useMemo<DemoContextValue>(
    () => ({
      openBuyOffset,
      openCertificate,
    }),
    [openBuyOffset, openCertificate],
  );

  return (
    <DemoExperienceContext.Provider value={contextValue}>
      {children}
      <DemoOverlay
        certificate={certificate}
        closeDemo={closeDemo}
        isOpen={isOpen}
        isSubmitting={isSubmitting}
        mode={mode}
        onBurn={handleBurn}
        openBuyOffset={openBuyOffset}
        view={view}
      />
    </DemoExperienceContext.Provider>
  );
}

export function useDemoExperience() {
  const context = useContext(DemoExperienceContext);

  if (!context) {
    throw new Error("useDemoExperience must be used within DemoExperienceProvider");
  }

  return context;
}
