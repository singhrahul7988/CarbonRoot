import type { Metadata } from "next";

import { Award, CheckCircle2 } from "lucide-react";

import { EditorialPageFrame } from "@/components/editorial/EditorialPageFrame";

const PRICING_TIERS = [
  {
    name: "Individual",
    price: "$0",
    suffix: "/ Month",
    description:
      "For personal climate stewards and simple offset tracking.",
    features: [
      "Verified Carbon Market Access",
      "Basic Ledger History",
      "Digital Certification",
    ],
    cta: "Start Now",
    featured: false,
  },
  {
    name: "Professional",
    price: "$249",
    suffix: "/ Month",
    description:
      "Built for climate tech startups and professional auditors.",
    features: [
      "Full Marketplace API Access",
      "White-label Credit Certificates",
      "Project-Specific Audit Logs",
      "Verra & Gold Standard Integration",
    ],
    cta: "Start Professional",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "",
    description: "End-to-end compliance for global corporations.",
    features: [
      "Compliance Mode Reporting",
      "Dedicated Account Manager",
      "Custom Ledger Architecture",
      "24/7 Priority Support",
    ],
    cta: "Contact Sales",
    featured: false,
  },
] as const;

const FEATURE_ROWS = [
  ["Infrastructure", "Shared Ledger", "Priority Node", "Dedicated Ledger"],
  ["Compliance", "-", "Basic Reporting", "Full Audit Readiness"],
  ["Certification", "Standard", "White-label", "Custom Branded"],
] as const;

export const metadata: Metadata = {
  title: "Pricing | CarbonRoot",
  description: "Compare CarbonRoot plans for individuals, operators, and enterprise compliance teams.",
};

export default function PricingPage() {
  return (
    <EditorialPageFrame active="pricing">
      <main className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-28 sm:px-8 xl:px-12">
        <header className="mb-24">
          <div className="mb-6 inline-flex rounded-sm border border-[color:color-mix(in_srgb,var(--color-highlight)_35%,var(--color-text-strong)_10%)] bg-[var(--color-highlight)] px-3 py-1">
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[#5b4300]">
              The Earth&apos;s Ledger
            </span>
          </div>

          <h1 className="max-w-4xl font-[var(--font-display)] text-[3.5rem] font-extrabold leading-tight tracking-[-0.03em] text-[var(--color-text-strong)]">
            Precision Economics for <br />
            Climate Resilience.
          </h1>

          <p className="mt-8 max-w-2xl text-[1.125rem] leading-relaxed text-[var(--color-text-muted)]">
            Choose a plan that aligns with your scale of impact. From
            individual transparency to enterprise-grade compliance, every credit
            is audited and immutable.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <article
              className={`relative flex flex-col justify-between p-10 ${
                tier.featured
                  ? "z-10 bg-[var(--color-accent)] p-12 text-white"
                  : "bg-white"
              }`}
              key={tier.name}
              style={tier.featured ? { boxShadow: "var(--shadow-subtle)" } : undefined}
            >
              {tier.featured ? (
                <div className="absolute right-0 top-0 bg-[var(--color-highlight)] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#5b4300]">
                  Most Popular
                </div>
              ) : null}

              <div>
                <h2
                  className={`mb-2 font-[var(--font-display)] text-2xl font-bold ${
                    tier.featured ? "text-white" : "text-[var(--color-text-strong)]"
                  }`}
                >
                  {tier.name}
                </h2>
                <div className="mb-8 flex items-baseline">
                  <span
                    className={`text-4xl font-extrabold ${
                      tier.featured ? "text-white" : "text-[var(--color-text-strong)]"
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.suffix ? (
                    <span
                      className={`ml-2 text-sm uppercase tracking-[0.18em] ${
                        tier.featured
                          ? "text-[color:color-mix(in_srgb,white_70%,transparent)]"
                          : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {tier.suffix}
                    </span>
                  ) : null}
                </div>
                <p
                  className={`mb-10 max-w-xs text-[0.875rem] leading-relaxed ${
                    tier.featured
                      ? "text-[color:color-mix(in_srgb,white_80%,transparent)]"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {tier.description}
                </p>

                <ul className="space-y-6">
                  {tier.features.map((feature) => (
                    <li className="flex items-start gap-3" key={feature}>
                      <CheckCircle2
                        className={`mt-0.5 h-5 w-5 ${
                          tier.featured
                            ? "text-[color:color-mix(in_srgb,white_75%,var(--color-highlight)_25%)]"
                            : "text-[var(--color-accent)]"
                        }`}
                      />
                      <span
                        className={`text-[0.875rem] ${
                          tier.featured ? "text-white" : "text-[var(--color-text-primary)]"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`mt-12 w-full rounded-lg py-4 text-center text-[0.875rem] font-bold uppercase tracking-[0.16em] transition-transform hover:scale-[0.99] active:scale-95 ${
                  tier.featured
                    ? "bg-white text-[var(--color-accent)]"
                    : tier.name === "Enterprise"
                      ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-strong)]"
                      : "border-b-2 border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)] text-[var(--color-text-strong)]"
                }`}
                type="button"
              >
                {tier.cta}
              </button>
            </article>
          ))}
        </section>

        <section className="mt-40">
          <h2 className="mb-12 font-[var(--font-display)] text-3xl font-bold text-[var(--color-text-strong)]">
            Detailed Ledger Features
          </h2>
          <div className="space-y-px">
            {FEATURE_ROWS.map((row, index) => (
              <div
                className={`grid grid-cols-4 items-center px-4 py-8 sm:px-8 ${
                  index % 2 === 0 ? "bg-[var(--color-surface-alt)]" : "bg-white"
                }`}
                key={row[0]}
              >
                {row.map((cell, cellIndex) => (
                  <div
                    className={`text-[0.875rem] ${
                      cellIndex === 0
                        ? "text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
                        : cell === "Full Audit Readiness"
                          ? "font-bold text-[var(--color-text-strong)]"
                          : "text-[var(--color-text-primary)]"
                    }`}
                    key={`${row[0]}-${cell}`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-40 grid grid-cols-12 gap-8">
          <article className="relative col-span-12 flex h-[400px] items-end overflow-hidden bg-[var(--color-surface-elevated)] p-12 md:col-span-8">
            <img
              alt="Institutional Integrity"
              className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDlXbucH5ydSoIKko63gWxA7BpWFuUGiWTIUvUWMb92D3DKKBQenTWHlafpBLYFbVEnATIKOKDeLIglGD_ZZs8lfzuDyjTbJ7-u9pXsnA4i9qnudCi7GjOBG6zckZtvRxLfa9ETK7gr5CskHIKIONEGImwnrVpahtvz0eNLF8qmsTcruFkejXfOE_UPpR5eKkQP1tubw0Vs3JbNRI9hhR0212Tj3PfAnSIfT3-syu9jS-758gD3-fLAjEv3bQrlOmuCdATyMwAmXE"
            />
            <div className="relative z-10 max-w-lg">
              <h3 className="mb-4 font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                Institutional Integrity
              </h3>
              <p className="leading-relaxed text-[var(--color-text-muted)]">
                CarbonRoot is powered by institutional-grade verification. Every
                purchase on any tier contributes to the permanent retirement of
                high-quality carbon credits.
              </p>
            </div>
          </article>

          <article className="col-span-12 flex flex-col justify-center bg-[var(--color-highlight)] p-12 md:col-span-4">
            <div className="mb-6">
              <Award className="h-12 w-12 text-[#3c2b00]" />
            </div>
            <h3 className="mb-2 font-[var(--font-display)] text-xl font-bold text-[#3c2b00]">
              Verified Ledger
            </h3>
            <p className="text-[0.875rem] leading-relaxed text-[#5b4300]">
              Our reporting standards meet Verra and Gold Standard audit
              requirements globally.
            </p>
          </article>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
