"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, BadgeCheck, Download, Share2 } from "lucide-react";

import styles from "./CertificateExperience.module.css";
import { PROJECTS_BY_SLUG } from "@/lib/projects";
import { buildExplorerTxUrl } from "@/lib/web3/config";

function formatAmount(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  });
}

function buildIssueDate() {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

type CertificateExperienceProps = {
  amount: number;
  fee: number;
  mode: "marketplace" | "compliance";
  projectSlug: string;
  approvalHash?: string;
  purchaseHash?: string;
  retirementHash?: string;
};

export function CertificateExperience({
  amount,
  fee,
  mode,
  projectSlug,
  approvalHash,
  purchaseHash,
  retirementHash,
}: CertificateExperienceProps) {
  const project = PROJECTS_BY_SLUG[projectSlug] ?? PROJECTS_BY_SLUG["luangwa-valley"];
  const buyOffsetHref = `/buy-offset?mode=${mode}&amount=${amount || 500}&project=${project.slug}`;

  const certificateId = useMemo(() => {
    const normalizedAmount = Math.max(1, Math.round(amount || 500));
    return `CR-${String(normalizedAmount).padStart(4, "0")}-${mode === "compliance" ? "ENT" : "MKT"}-2026`;
  }, [amount, mode]);

  const handleSavePdf = () => {
    window.print();
  };

  const handleShare = () => {
    const shareUrl = new URL("https://www.linkedin.com/sharing/share-offsite/");
    shareUrl.searchParams.set("url", window.location.href);
    window.open(shareUrl.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link className={styles.backLink} href={buyOffsetHref}>
            <ArrowLeft size={16} />
            <span>Back to Buy Offset</span>
          </Link>
          <div className={styles.brandBlock}>
            <p className={styles.brand}>CarbonRoot</p>
            <p className={styles.brandSub}>The Earth&apos;s Ledger</p>
          </div>
        </div>

        <nav className={styles.headerNav}>
          <span>Marketplace</span>
          <span>Portfolio</span>
          <span>Analytics</span>
          <span className={styles.activeNavItem}>Verification</span>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <BadgeCheck size={18} />
            <span>Transaction Verified</span>
          </div>
          <h1 className={styles.title}>Carbon Retirement Complete</h1>
          <p className={styles.body}>
            Your tokens have been permanently burned on the CarbonRoot ledger. The
            certificate below is the audit-ready proof attached to this retirement
            event.
          </p>
        </section>

        <section className={styles.certificateStage}>
          <article className={styles.paper}>
            <div className={styles.paperWatermark} aria-hidden="true">
              CR-AUDIT
            </div>

            <div className={styles.paperTop}>
              <div>
                <p className={styles.metaLabel}>Serial Number</p>
                <p className={styles.metaValue}>{certificateId}</p>
              </div>
              <div className={styles.metaRight}>
                <p className={styles.metaLabel}>Issue Date</p>
                <p className={styles.metaValue}>{buildIssueDate()}</p>
              </div>
            </div>

            <div className={styles.paperIntro}>
              <h2 className={styles.paperHeading}>Certificate of Retirement</h2>
              <div className={styles.rule} />
              <p className={styles.introLabel}>This document certifies that</p>
              <h3 className={styles.companyName}>
                {mode === "compliance" ? "Global Logistics Corp" : "CarbonRoot Marketplace Buyer"}
              </h3>
              <p className={styles.introBody}>
                Has retired verified carbon credits from the {project.title} project
                to neutralize operational emissions and create a permanent
                retirement record.
              </p>
            </div>

            <div className={styles.impactPanel}>
              <p className={styles.panelLabel}>Total Impact Volume</p>
              <div className={styles.impactValue}>
                <strong>{formatAmount(amount || 500)}</strong>
                <span>mtCO2e</span>
              </div>
            </div>

            <div className={styles.paperFooter}>
              <div className={styles.qrBlock}>
                <div className={styles.qrShell} aria-hidden="true">
                  <div className={styles.qrGrid}>
                    <span className={styles.qrBright} />
                    <span />
                    <span className={styles.qrBright} />
                    <span />
                    <span className={styles.qrBright} />
                    <span />
                    <span className={styles.qrBright} />
                    <span />
                    <span className={styles.qrBright} />
                  </div>
                </div>
                <p className={styles.smallLabel}>Scan to Verify Ledger</p>
              </div>

              <div className={styles.sealBlock}>
                <div className={styles.seal}>GS</div>
                <p className={styles.smallLabel}>{project.standard}</p>
              </div>

              <div className={styles.signatureBlock}>
                <p className={styles.signatureName}>E. Sterling</p>
                <div className={styles.signatureRule} />
                <p className={styles.smallLabel}>Authenticated by CarbonRoot Audits</p>
              </div>
            </div>

            <div className={styles.cornerTop} aria-hidden="true" />
            <div className={styles.cornerBottom} aria-hidden="true" />
          </article>

          <div className={styles.actions}>
            <button className={styles.primaryAction} onClick={handleSavePdf} type="button">
              <Download size={18} />
              <span>Save as PDF</span>
            </button>
            <button className={styles.secondaryAction} onClick={handleShare} type="button">
              <Share2 size={18} />
              <span>Share on LinkedIn</span>
            </button>
          </div>

          <Link className={styles.returnLink} href="/">
            Return to Landing Page
          </Link>
        </section>

        <section className={styles.detailsSection}>
          <h4 className={styles.detailsHeading}>Offset Source Details</h4>
          <div className={styles.detailsGrid}>
            <article className={styles.detailCard}>
              <p className={styles.metaLabel}>Registry</p>
              <p className={styles.detailTitle}>{project.standard}</p>
              <p className={styles.detailBody}>Project ID: {project.projectId}</p>
            </article>
            <article className={styles.detailCard}>
              <p className={styles.metaLabel}>Vintage Year</p>
              <p className={styles.detailTitle}>{project.vintage}</p>
              <p className={styles.detailBody}>{project.location}</p>
            </article>
            <article className={styles.detailCard}>
              <p className={styles.metaLabel}>Retirement Hash</p>
              <p className={styles.detailTitle}>{retirementHash ?? "Pending"}</p>
              <p className={styles.detailBody}>
                {retirementHash ? (
                  <a href={buildExplorerTxUrl(retirementHash)} rel="noreferrer" target="_blank">
                    View retirement on explorer
                  </a>
                ) : (
                  `Recorded retirement amount: ${formatAmount(amount || 500)} CRT`
                )}
              </p>
            </article>
            <article className={styles.detailCard}>
              <p className={styles.metaLabel}>Purchase Hash</p>
              <p className={styles.detailTitle}>{purchaseHash ?? "Pending"}</p>
              <p className={styles.detailBody}>
                {purchaseHash ? (
                  <a href={buildExplorerTxUrl(purchaseHash)} rel="noreferrer" target="_blank">
                    View purchase on explorer
                  </a>
                ) : (
                  "The certificate was opened without a purchase hash in the URL."
                )}
              </p>
            </article>
            <article className={styles.detailCard}>
              <p className={styles.metaLabel}>Approval Hash</p>
              <p className={styles.detailTitle}>{approvalHash ?? "Not required in this session"}</p>
              <p className={styles.detailBody}>
                {approvalHash ? (
                  <a href={buildExplorerTxUrl(approvalHash)} rel="noreferrer" target="_blank">
                    View token approval on explorer
                  </a>
                ) : fee > 0 ? (
                  `Legacy fee input: ${formatAmount(fee)}`
                ) : (
                  "Approval may already have existed before this purchase."
                )}
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
