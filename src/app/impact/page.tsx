import type { Metadata } from "next";

import {
  ArrowRight,
  Droplets,
  ReceiptText,
  Sun,
  Trees,
  TrendingUp,
} from "lucide-react";

import { EditorialPageFrame } from "@/components/editorial/EditorialPageFrame";

const RECENT_PROOFS = [
  {
    id: "Cert #CR-8829-01",
    summary: "Boreal Forest Restoration - 450 Tons",
    accent: "var(--color-highlight)",
  },
  {
    id: "Cert #CR-9120-45",
    summary: "Solar Micro-Grids Sub-Saharan - 1,200 Tons",
    accent: "var(--color-accent)",
  },
  {
    id: "Cert #CR-0034-92",
    summary: "Peatland Protection Indonesia - 800 Tons",
    accent: "var(--color-text-muted)",
  },
] as const;

const PROJECT_ROWS = [
  ["Amazon Rainforest Protection", "Brazil, Para", "4,500 tCO2e"],
  ["Mangrove Restoration Delta", "Vietnam, Mekong", "2,200 tCO2e"],
  ["Wind Farm 42 Cluster", "India, Rajasthan", "7,508 tCO2e"],
] as const;

const CHART_BARS = [
  { tone: "muted", height: 128 },
  { tone: "strong", height: 96 },
  { tone: "muted", height: 192 },
  { tone: "strong", height: 160 },
  { tone: "muted", height: 224 },
  { tone: "strong", height: 208 },
  { tone: "muted", height: 240 },
  { tone: "strong", height: 232 },
] as const;

export const metadata: Metadata = {
  title: "Impact | CarbonRoot",
  description: "Review CarbonRoot impact metrics, retirement trends, and recent proof artifacts.",
};

export default function ImpactPage() {
  return (
    <EditorialPageFrame active="impact">
      <main className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-28 sm:px-8 xl:px-12">
        <section className="mb-16">
          <h1 className="mb-4 font-[var(--font-display)] text-5xl font-extrabold tracking-[-0.03em] text-[var(--color-text-strong)]">
            Impact Ledger
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)]">
            A real-time, cryptographic record of your environmental
            contribution. Transparency is the only metric that matters.
          </p>
        </section>

        <section className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="flex min-h-[220px] flex-col justify-between rounded-lg bg-[var(--color-surface-alt)] p-8">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Total Retired Tons
            </span>
            <div>
              <span className="font-[var(--font-display)] text-6xl font-extrabold text-[var(--color-text-strong)]">
                14,208
              </span>
              <span className="ml-2 text-sm text-[var(--color-text-muted)]">
                tCO2e
              </span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[var(--color-accent)]">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+12% vs last quarter</span>
            </div>
          </article>

          <article className="flex min-h-[220px] flex-col justify-between rounded-lg bg-[var(--color-accent)] p-8 text-white">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,white_70%,transparent)]">
              Estimated Warming Avoided
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-[var(--font-display)] text-6xl font-extrabold">
                0.0004
              </span>
              <span className="text-xl">&deg;C</span>
            </div>
            <div className="rounded-lg border border-[color:color-mix(in_srgb,var(--color-border)_20%,transparent)] bg-white/10 p-3">
              <p className="text-xs leading-tight text-[color:color-mix(in_srgb,white_88%,transparent)]">
                Calculated based on current global IPCC warming pathways and
                cumulative portfolio offset data.
              </p>
            </div>
          </article>

          <article className="flex min-h-[220px] flex-col gap-6 rounded-lg bg-[var(--color-surface-alt)] p-8">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              SDG Alignment
            </span>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Life on Land", icon: Trees },
                { label: "Clean Water", icon: Droplets },
                { label: "Affordable Energy", icon: Sun },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className="flex items-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--color-border)_20%,transparent)] bg-[var(--color-surface-elevated)] px-3 py-1.5"
                    key={item.label}
                  >
                    <Icon className="h-4 w-4 text-[var(--color-accent)]" />
                    <span className="text-xs font-bold text-[var(--color-accent)]">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              className="self-start text-sm font-bold text-[var(--color-text-strong)] underline decoration-[color:color-mix(in_srgb,var(--color-border)_40%,transparent)] transition-colors hover:decoration-[var(--color-text-strong)]"
              type="button"
            >
              View Methodology
            </button>
          </article>
        </section>

        <section className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                  Retirement Trends
                </h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Quarterly issuance vs. retirement volume
                </p>
              </div>
              <div className="flex gap-4 text-xs font-bold">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[var(--color-accent)]" />
                  Retired
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[var(--color-border)]" />
                  Issued
                </span>
              </div>
            </div>

            <div className="flex min-h-[400px] items-end justify-between rounded-lg bg-white p-8">
              <div className="flex w-full flex-col items-center gap-4">
                <div className="flex h-64 w-full items-end justify-around border-b border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)]">
                  {CHART_BARS.map((bar, index) => (
                    <div
                      className={`w-8 rounded-t-sm sm:w-12 ${
                        bar.tone === "strong"
                          ? "bg-[var(--color-accent)]"
                          : "bg-[var(--color-border)]"
                      }`}
                      key={`${bar.tone}-${index}`}
                      style={{ height: `${bar.height}px` }}
                    />
                  ))}
                </div>
                <div className="flex w-full justify-around text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  <span>Q1 23</span>
                  <span>Q2 23</span>
                  <span>Q3 23</span>
                  <span>Q4 23</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h2 className="mb-8 font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
              Recent Proofs
            </h2>
            <div className="space-y-4">
              {RECENT_PROOFS.map((proof) => (
                <article
                  className="rounded-lg bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  key={proof.id}
                  style={{ borderLeft: `4px solid ${proof.accent}` }}
                >
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <span className="font-[var(--font-display)] text-sm font-bold text-[var(--color-text-strong)]">
                      {proof.id}
                    </span>
                    <span className="rounded bg-[var(--color-highlight)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5b4300]">
                      Verified
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-[var(--color-text-muted)]">
                    {proof.summary}
                  </p>
                  <button
                    className="group flex items-center gap-2 text-xs font-bold text-[var(--color-text-strong)]"
                    type="button"
                  >
                    <ReceiptText className="h-4 w-4" />
                    View Cryptographic Proof
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-12 font-[var(--font-display)] text-3xl font-bold text-[var(--color-text-strong)]">
            Project Allocation
          </h2>
          <div className="overflow-hidden rounded-lg border border-[var(--color-surface-elevated)] bg-white">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[var(--color-surface-alt)] text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {[
                    "Project Name",
                    "Location",
                    "Retired Tons",
                    "Status",
                    "Audit Log",
                  ].map((header) => (
                    <th
                      className={`px-8 py-5 ${
                        header === "Audit Log" ? "text-right" : ""
                      }`}
                      key={header}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-surface-elevated)] text-sm">
                {PROJECT_ROWS.map((row) => (
                  <tr
                    className="transition-colors hover:bg-[var(--color-surface-alt)]"
                    key={row[0]}
                  >
                    <td className="px-8 py-6 font-bold text-[var(--color-text-strong)]">
                      {row[0]}
                    </td>
                    <td className="px-8 py-6 text-[var(--color-text-muted)]">
                      {row[1]}
                    </td>
                    <td className="px-8 py-6">{row[2]}</td>
                    <td className="px-8 py-6">
                      <span className="rounded-full bg-[var(--color-accent-2)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                        Retired
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-[var(--color-accent)]" type="button">
                        <ReceiptText className="ml-auto h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-lg bg-[var(--color-surface-alt)] p-8 sm:p-12 md:grid-cols-2">
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[color:color-mix(in_srgb,var(--color-accent-2)_10%,transparent)] blur-[100px]" />
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Current Spotlight
            </span>
            <h2 className="mb-6 font-[var(--font-display)] text-4xl font-extrabold leading-tight text-[var(--color-text-strong)]">
              High-Density Kelp Reforestation
            </h2>
            <p className="mb-8 max-w-xl leading-relaxed text-[var(--color-text-muted)]">
              Located in the North Sea, this project captures carbon at 50x the
              rate of terrestrial forests. CarbonRoot provides daily biomass
              verification via underwater drone mapping.
            </p>

            <div className="flex flex-wrap gap-8">
              <div>
                <span className="block font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                  820t
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  Monthly Capture
                </span>
              </div>
              <div className="hidden h-12 w-px bg-[color:color-mix(in_srgb,var(--color-border)_30%,transparent)] sm:block" />
              <div>
                <span className="block font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                  99.9%
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  Verification Certainty
                </span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="aspect-square overflow-hidden rounded-lg bg-[var(--color-surface-elevated)] shadow-2xl">
              <img
                alt="High-Density Kelp Reforestation"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwkegToTOChPiXMbJE0dYFSFX1L-MDhAoFJobegtXPFHKzUO6hCZVvxvNT7E1gAG5o2zRB_AEoTIK_goZd-C1sSIArLA37Tt43jGtgtE_l11DMTqJeTusrOBK3o08kIeUc0yZGfAZBslT1DrmZzm6nFDGb6rTJzOOzevJ1J6QPjkUtxv8jvJFmGjA0XwRFFKMxTmuEm8YPO8Iwx7dPENQ5-xfmLCNH8eULEkDg5Ip55U11mxgRq_eoZ4RCLSs9excfu511FpqvcFI"
              />
            </div>

            <div
              className="absolute -bottom-4 -left-4 max-w-[200px] rounded-lg bg-white p-4"
              style={{ boxShadow: "var(--shadow-subtle)" }}
            >
              <span className="mb-1 flex items-center gap-1 text-[10px] font-black uppercase text-[var(--color-accent)]">
                <ReceiptText className="h-3 w-3" />
                Verified Origin
              </span>
              <p className="text-[10px] leading-tight text-[var(--color-text-muted)]">
                Project verified by DNV and recorded on Earth Ledger v2.1
              </p>
            </div>
          </div>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
