import type { Metadata } from "next";

import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  ShieldCheck,
  SquareCheckBig,
} from "lucide-react";

import { EditorialPageFrame } from "@/components/editorial/EditorialPageFrame";

const STATUS_CARDS = [
  {
    label: "Certification Status",
    title: "ISO 14064 Compliant",
    description:
      "Verified Greenhouse Gas Statement for the current fiscal year.",
    badge: "Audit Confirmed",
    accent: "amber",
    icon: ShieldCheck,
  },
  {
    label: "Regulatory Alignment",
    title: "CSRD Ready",
    description:
      "All quantitative and qualitative disclosures mapped to EU standards.",
    badge: "94% Prepared",
    accent: "blue",
    icon: SquareCheckBig,
  },
] as const;

const DEADLINES = [
  { day: "12", title: "SEC Climate Risk Disclosure", date: "Oct 2024" },
  { day: "28", title: "Annual Sustainability Audit", date: "Nov 2024" },
] as const;

const AUDIT_ROWS = [
  {
    refId: "CR-992-AXL",
    timestamp: "2024-08-14 14:22:10",
    activity: "Emissions Verification",
    entity: "Scope 2 (EMEA)",
    status: "Immutable",
    statusTone: "primary",
    action: "Download",
  },
  {
    refId: "CR-847-BKT",
    timestamp: "2024-08-12 09:15:44",
    activity: "Standard Reconciliation",
    entity: "Verra VM0042",
    status: "Immutable",
    statusTone: "primary",
    action: "Download",
  },
  {
    refId: "CR-712-MKZ",
    timestamp: "2024-08-10 18:45:02",
    activity: "Policy Update",
    entity: "ESG Governance",
    status: "Draft",
    statusTone: "secondary",
    action: "View",
  },
] as const;

export const metadata: Metadata = {
  title: "Compliance | CarbonRoot",
  description: "Monitor CarbonRoot compliance readiness, critical deadlines, and immutable audit events.",
};

export default function CompliancePage() {
  return (
    <EditorialPageFrame active="compliance">
      <main className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-28 sm:px-8 xl:px-12">
        <section className="mb-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="mb-4 font-[var(--font-display)] text-5xl font-extrabold tracking-[-0.03em] text-[var(--color-text-strong)]">
              Compliance Portal
            </h1>
            <p className="max-w-2xl text-lg text-[var(--color-text-muted)]">
              Centralized oversight for global carbon reporting standards and
              audit-ready documentation.
            </p>
          </div>

          <div className="col-span-12 flex items-end justify-start lg:col-span-4 lg:justify-end">
            <Link
              className="inline-flex items-center gap-3 rounded-lg bg-[linear-gradient(145deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] px-8 py-4 font-bold text-white"
              href="/compliance/report"
              style={{ boxShadow: "var(--shadow-subtle)" }}
            >
              <FileText className="h-4 w-4" />
              Export SEC-Ready Report
            </Link>
          </div>
        </section>

        <section className="mb-16 grid grid-cols-12 gap-8">
          {STATUS_CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <article
                className="col-span-12 rounded-lg bg-white p-8 md:col-span-4"
                key={card.title}
                style={{ boxShadow: "var(--shadow-subtle)" }}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                    {card.label}
                  </span>
                  <Icon className="h-4 w-4 text-[var(--color-accent)]" />
                </div>
                <h2 className="mb-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                  {card.title}
                </h2>
                <p className="mb-6 text-sm text-[var(--color-text-muted)]">
                  {card.description}
                </p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                    card.accent === "amber"
                      ? "bg-[var(--color-highlight)] text-[#5b4300]"
                      : "bg-[color:color-mix(in_srgb,#c6e4f4_80%,white)] text-[var(--color-text-muted)]"
                  }`}
                >
                  {card.badge}
                </span>
              </article>
            );
          })}

          <article
            className="col-span-12 flex h-full flex-col justify-between rounded-lg bg-[var(--color-accent)] p-8 text-white md:col-span-4"
            style={{ boxShadow: "var(--shadow-subtle)" }}
          >
            <div>
              <span className="mb-6 block text-xs font-bold uppercase tracking-[0.1em] text-[color:color-mix(in_srgb,white_70%,transparent)]">
                Critical Deadlines
              </span>
              <ul className="space-y-4">
                {DEADLINES.map((deadline) => (
                  <li className="flex items-center gap-4" key={deadline.title}>
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-white/10 text-sm font-bold">
                      {deadline.day}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{deadline.title}</p>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[color:color-mix(in_srgb,white_68%,transparent)]">
                        {deadline.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[color:color-mix(in_srgb,white_72%,transparent)] transition-colors hover:text-white"
              type="button"
            >
              <CalendarDays className="h-4 w-4" />
              View Full Calendar
            </button>
          </article>
        </section>

        <section className="rounded-xl bg-[var(--color-surface-alt)] p-1">
          <div
            className="rounded-lg bg-white p-6 sm:p-10"
            style={{ boxShadow: "var(--shadow-subtle)" }}
          >
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mb-2 font-[var(--font-display)] text-3xl font-bold tracking-[-0.02em] text-[var(--color-text-strong)]">
                  Audit Log
                </h2>
                <p className="max-w-md text-sm text-[var(--color-text-muted)]">
                  Immutable ledger of all compliance activities and third-party
                  verifications performed on the CarbonRoot network.
                </p>
              </div>

              <div className="relative w-full md:w-80">
                <FileText className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:color-mix(in_srgb,var(--color-text-muted)_70%,transparent)]" />
                <input
                  className="w-full border-0 border-b-2 border-[var(--color-accent)] bg-[var(--color-surface-alt)] px-12 py-3 text-sm font-medium outline-none"
                  placeholder="Search Ref ID or Event..."
                  type="text"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[var(--color-surface-alt)]">
                    {["Ref ID", "Timestamp (UTC)", "Activity Type", "Entity", "Status", "Certificate"].map(
                      (header) => (
                        <th
                          className={`px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] ${
                            header === "Certificate" ? "text-right" : ""
                          }`}
                          key={header}
                        >
                          {header}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-surface-alt)]">
                  {AUDIT_ROWS.map((row) => (
                    <tr
                      className="transition-colors hover:bg-[color:color-mix(in_srgb,var(--color-surface-alt)_65%,white)]"
                      key={row.refId}
                    >
                      <td className="px-6 py-6 font-mono text-xs font-bold text-[var(--color-accent)]">
                        {row.refId}
                      </td>
                      <td className="px-6 py-6 text-sm text-[var(--color-text-muted)]">
                        {row.timestamp}
                      </td>
                      <td className="px-6 py-6 text-sm font-semibold text-[var(--color-text-strong)]">
                        {row.activity}
                      </td>
                      <td className="px-6 py-6 text-sm text-[var(--color-text-muted)]">
                        {row.entity}
                      </td>
                      <td className="px-6 py-6">
                        <div
                          className={`flex items-center gap-2 text-xs font-bold ${
                            row.statusTone === "primary"
                              ? "text-[var(--color-accent)]"
                              : "text-[var(--color-text-muted)]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              row.statusTone === "primary"
                                ? "bg-[var(--color-accent)]"
                                : "bg-[var(--color-text-muted)]"
                            }`}
                          />
                          {row.status}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button
                          className="text-xs font-bold text-[var(--color-text-strong)] underline decoration-[color:color-mix(in_srgb,var(--color-border)_40%,transparent)] transition-colors hover:decoration-[var(--color-text-strong)]"
                          type="button"
                        >
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 flex flex-col gap-6 border-t border-[var(--color-surface-alt)] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Showing 3 of 124 records
              </span>
              <div className="flex gap-4">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded border border-[var(--color-surface-alt)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-alt)]"
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded border border-[var(--color-accent)] bg-[var(--color-accent)] text-xs font-bold text-white"
                  type="button"
                >
                  1
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded border border-[var(--color-surface-alt)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-alt)]"
                  type="button"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
