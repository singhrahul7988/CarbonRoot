import type { Metadata } from "next";

import { Activity, Building2, ShieldCheck } from "lucide-react";

import { BookDemoForm } from "@/components/editorial/BookDemoForm";
import { EditorialPageFrame } from "@/components/editorial/EditorialPageFrame";

const BENEFITS = [
  {
    title: "Verra & Gold Standard Integration",
    description:
      "Automated retirement of high-integrity credits directly into your corporate registry.",
    icon: ShieldCheck,
  },
  {
    title: "Audit-Ready Reporting",
    description:
      "Download retirement certificates and blockchain-anchored audit logs for each completed offset event.",
    icon: Building2,
  },
  {
    title: "Portfolio Compliance Monitoring",
    description:
      "Real-time alerts for project verification updates and policy alignment.",
    icon: Activity,
  },
] as const;

export const metadata: Metadata = {
  title: "Book a Demo | CarbonRoot",
  description: "Connect with the CarbonRoot ESG solutions team for a compliance workflow demo.",
};

export default function BookDemoPage() {
  return (
    <EditorialPageFrame active={null}>
      <main className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-5 pb-20 pt-28 sm:px-8 xl:px-12">
        <div className="grid w-full grid-cols-12 gap-10 xl:gap-16">
          <section className="col-span-12 flex flex-col justify-center lg:col-span-5">
            <div className="mb-6 inline-flex self-start rounded-sm border border-[color:color-mix(in_srgb,var(--color-highlight)_35%,var(--color-text-strong)_10%)] bg-[var(--color-highlight)] px-3 py-1">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#5b4300]">
                Enterprise Ledger
              </span>
            </div>

            <h1 className="mb-8 max-w-md font-[var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--color-text-strong)] md:text-6xl">
              Ready to fortify your ESG strategy?
            </h1>

            <p className="mb-12 max-w-md text-lg leading-relaxed text-[var(--color-text-muted)]">
              Join the world&apos;s most transparent climate marketplace. Our
              compliance suite provides institutional-grade audit logs and
              real-time impact verification.
            </p>

            <div className="space-y-8">
              {BENEFITS.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div className="flex items-start gap-4" key={benefit.title}>
                    <Icon className="mt-1 h-5 w-5 text-[var(--color-accent-2)]" />
                    <div>
                      <h2 className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-primary)]">
                        {benefit.title}
                      </h2>
                      <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div
              className="relative overflow-hidden rounded-xl bg-white p-8 sm:p-10 xl:p-14"
              style={{ boxShadow: "var(--shadow-subtle)" }}
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[color:color-mix(in_srgb,var(--color-accent-2)_10%,transparent)] blur-3xl" />

              <div className="mb-10">
                <h2 className="mb-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                  Compliance Request
                </h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Complete the form below to connect with our ESG solutions team.
                </p>
              </div>

              <BookDemoForm />
            </div>
          </section>
        </div>
      </main>
    </EditorialPageFrame>
  );
}
