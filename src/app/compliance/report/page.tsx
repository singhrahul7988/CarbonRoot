import type { Metadata } from "next";
import { Building2, FileCheck2, Globe2, ShieldCheck } from "lucide-react";

import { ComplianceReportActions } from "@/components/compliance/ComplianceReportActions";

const COVERAGE = [
  {
    label: "Reporting Window",
    value: "FY 2025 / Q4 Close",
  },
  {
    label: "Primary Standards",
    value: "CSRD, SEC Climate, ISO 14064",
  },
  {
    label: "Registry Sources",
    value: "Verra VCS, Gold Standard",
  },
  {
    label: "Retirement Volume",
    value: "14,208 tCO2e",
  },
] as const;

const EXECUTIVE_POINTS = [
  "CarbonRoot reconciled all retired credit positions against registry-backed supply and retained immutable retirement references for every material transaction.",
  "The current reporting perimeter covers enterprise procurement, retirement proof, audit-log snapshots, and certificate-ready evidence mapped to policy disclosure controls.",
  "No speculative ownership or yield claims are presented in this package; the report is framed strictly around verified procurement, permanent retirement, and audit-ready proof.",
] as const;

const ALLOCATION_ROWS = [
  {
    project: "Luangwa Valley Reforestation",
    location: "Zambia, Africa",
    standard: "Verra VCS + CCB",
    retired: "7,508 tCO2e",
  },
  {
    project: "Amazonian Canopy Shield",
    location: "Brazil, Para",
    standard: "Gold Standard",
    retired: "4,500 tCO2e",
  },
  {
    project: "Oceanic Mangrove Initiative",
    location: "Indonesia, Sulawesi",
    standard: "Verra VCS Blue Carbon",
    retired: "2,200 tCO2e",
  },
] as const;

const CONTROL_ROWS = [
  {
    control: "Registry reconciliation",
    status: "Confirmed",
    detail: "Project IDs and issued supply aligned before retirement settlement.",
  },
  {
    control: "Retirement evidence",
    status: "Confirmed",
    detail: "Each retirement packaged with serial, beneficiary, and ledger hash references.",
  },
  {
    control: "Export readiness",
    status: "Prepared",
    detail: "Formatted for board review, PDF export, and external auditor circulation.",
  },
] as const;

const AUDIT_LOGS = [
  {
    ref: "CR-992-AXL",
    timestamp: "2026-03-28 14:22 UTC",
    event: "Emissions verification",
    entity: "Scope 2 (EMEA)",
  },
  {
    ref: "CR-847-BKT",
    timestamp: "2026-03-27 09:15 UTC",
    event: "Registry reconciliation",
    entity: "Verra VM0042",
  },
  {
    ref: "CR-712-MKZ",
    timestamp: "2026-03-25 18:45 UTC",
    event: "Policy control check",
    entity: "ESG governance package",
  },
] as const;

export const metadata: Metadata = {
  title: "Compliance Report | CarbonRoot",
  description:
    "Export-ready CarbonRoot compliance report for enterprise climate obligations.",
};

export default function ComplianceReportPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-16 text-[var(--color-text-primary)]">
      <ComplianceReportActions />

      <main className="mx-auto mt-6 flex w-full max-w-[1440px] flex-col gap-8 px-5 sm:px-8 xl:px-12 print:mt-0 print:max-w-none print:px-0">
        <section className="overflow-hidden rounded-[28px] border border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)] bg-white print:rounded-none print:border-0">
          <div className="bg-[linear-gradient(135deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] px-8 py-10 text-white sm:px-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-5">
                <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.2em]">
                  CarbonRoot Compliance Package
                </div>
                <div className="space-y-3">
                  <p className="font-[var(--font-display)] text-sm font-extrabold uppercase tracking-[0.22em] text-[color:color-mix(in_srgb,white_76%,transparent)]">
                    The Earth&apos;s Ledger
                  </p>
                  <h1 className="font-[var(--font-display)] text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">
                    Enterprise Climate Obligations Report
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-[color:color-mix(in_srgb,white_84%,transparent)]">
                    Audit-ready summary of verified procurement, permanent retirements,
                    and reporting controls prepared for executive, regulator, and
                    auditor review.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 text-sm text-[color:color-mix(in_srgb,white_84%,transparent)]">
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[color:color-mix(in_srgb,white_64%,transparent)]">
                    Prepared For
                  </p>
                  <p className="mt-1 font-[var(--font-display)] text-xl font-bold text-white">
                    Global Logistics Corp
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[color:color-mix(in_srgb,white_64%,transparent)]">
                    Report Reference
                  </p>
                  <p className="mt-1 font-mono text-sm font-bold text-white">
                    CR-CMP-2026-Q1-014
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-b border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)] bg-[var(--color-surface-alt)] px-8 py-6 sm:grid-cols-2 xl:grid-cols-4 xl:px-12">
            {COVERAGE.map((item) => (
              <div key={item.label}>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {item.label}
                </p>
                <p className="mt-2 font-[var(--font-display)] text-lg font-bold text-[var(--color-text-strong)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 px-8 py-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:px-12">
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[var(--color-accent)]" />
                <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                  Executive Summary
                </h2>
              </div>
              <div className="space-y-4 text-sm leading-7 text-[var(--color-text-muted)]">
                {EXECUTIVE_POINTS.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>

              <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--color-border)_42%,transparent)] bg-[var(--color-surface-alt)] p-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[var(--color-accent)]" />
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      Assurance Statement
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-primary)]">
                      CarbonRoot validates this package as an export-ready compliance
                      summary, suitable for executive review and auditor handoff.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-[var(--color-accent)]" />
                <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                  Project Allocation
                </h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)]">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-[var(--color-surface-alt)]">
                    <tr>
                      {["Project", "Location", "Standard", "Retired"].map((header) => (
                        <th
                          className="px-4 py-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
                          key={header}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:color-mix(in_srgb,var(--color-border)_28%,transparent)] bg-white text-sm">
                    {ALLOCATION_ROWS.map((row) => (
                      <tr key={row.project}>
                        <td className="px-4 py-4 font-semibold text-[var(--color-text-strong)]">
                          {row.project}
                        </td>
                        <td className="px-4 py-4 text-[var(--color-text-muted)]">{row.location}</td>
                        <td className="px-4 py-4 text-[var(--color-text-muted)]">{row.standard}</td>
                        <td className="px-4 py-4 font-semibold text-[var(--color-text-strong)]">
                          {row.retired}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="grid gap-8 border-t border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)] px-8 py-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:px-12">
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <FileCheck2 className="h-5 w-5 text-[var(--color-accent)]" />
                <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                  Control Status
                </h2>
              </div>
              <div className="grid gap-4">
                {CONTROL_ROWS.map((row) => (
                  <article
                    className="rounded-2xl border border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)] bg-[var(--color-surface-alt)] p-5"
                    key={row.control}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-[var(--font-display)] text-lg font-bold text-[var(--color-text-strong)]">
                          {row.control}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                          {row.detail}
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--color-highlight)] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#5b4300]">
                        {row.status}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                Audit Trail Snapshot
              </h2>
              <div className="overflow-hidden rounded-2xl border border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)] bg-white">
                {AUDIT_LOGS.map((item, index) => (
                  <div
                    className={`grid gap-2 px-5 py-5 text-sm sm:grid-cols-[9rem_minmax(0,1fr)_9rem] ${
                      index < AUDIT_LOGS.length - 1
                        ? "border-b border-[color:color-mix(in_srgb,var(--color-border)_28%,transparent)]"
                        : ""
                    }`}
                    key={item.ref}
                  >
                    <div className="font-mono font-bold text-[var(--color-accent)]">{item.ref}</div>
                    <div>
                      <p className="font-semibold text-[var(--color-text-strong)]">{item.event}</p>
                      <p className="mt-1 text-[var(--color-text-muted)]">{item.entity}</p>
                    </div>
                    <div className="text-[var(--color-text-muted)] sm:text-right">{item.timestamp}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="border-t border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)] bg-[var(--color-surface-alt)] px-8 py-8 xl:px-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Authorized By
                </p>
                <p className="mt-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                  CarbonRoot Audit Operations
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Prepared March 31, 2026 for demo-day review and enterprise export.
                </p>
              </div>

              <div className="text-sm text-[var(--color-text-muted)]">
                <p className="font-semibold text-[var(--color-text-strong)]">
                  Contact: compliance@carbonroot.demo
                </p>
                <p className="mt-1">Brand line: Securing the planet&apos;s future through institutional-grade carbon verification.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
