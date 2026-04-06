import type { Metadata } from "next";

import { FileCheck2, MapPinned, ShieldCheck } from "lucide-react";

import { EditorialPageFrame } from "@/components/editorial/EditorialPageFrame";
import { ProjectSubmissionForm } from "@/components/submission/ProjectSubmissionForm";

const STEPS = [
  {
    title: "Submit core project metadata",
    description: "Capture project type, registry standard, and the operating coordinates used for verification.",
    icon: MapPinned,
  },
  {
    title: "Attach proof package",
    description: "Provide the proof artifact URL used for manual admin review and future IPFS packaging.",
    icon: FileCheck2,
  },
  {
    title: "Admin approval and minting",
    description: "For the MVP, approval remains manual before contracts are used to mint supply on BSC testnet.",
    icon: ShieldCheck,
  },
] as const;

export const metadata: Metadata = {
  title: "Project Submission | CarbonRoot",
  description: "Submit a carbon project to CarbonRoot for review, approval, and future tokenized listing.",
};

export default function ProjectSubmissionPage() {
  return (
    <EditorialPageFrame active={null}>
      <main className="mx-auto flex min-h-screen w-full max-w-[1440px] items-start px-5 pb-20 pt-28 sm:px-8 xl:px-12">
        <div className="grid w-full grid-cols-12 gap-10 xl:gap-16">
          <section className="col-span-12 flex flex-col justify-center lg:col-span-5">
            <div className="mb-6 inline-flex self-start rounded-sm border border-[color:color-mix(in_srgb,var(--color-highlight)_35%,var(--color-text-strong)_10%)] bg-[var(--color-highlight)] px-3 py-1">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#5b4300]">
                Supply Intake
              </span>
            </div>

            <h1 className="mb-8 max-w-md font-[var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--color-text-strong)] md:text-6xl">
              Submit a verified project for listing.
            </h1>

            <p className="mb-12 max-w-md text-lg leading-relaxed text-[var(--color-text-muted)]">
              This intake flow captures the minimum dataset needed for CarbonRoot’s
              Phase 1 review, mock verification, and listing pipeline.
            </p>

            <div className="space-y-8">
              {STEPS.map((step) => {
                const Icon = step.icon;

                return (
                  <div className="flex items-start gap-4" key={step.title}>
                    <Icon className="mt-1 h-5 w-5 text-[var(--color-accent-2)]" />
                    <div>
                      <h2 className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-primary)]">
                        {step.title}
                      </h2>
                      <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {step.description}
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
                  Project Submission
                </h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Complete the form below to enter a project into the CarbonRoot MVP listing pipeline.
                </p>
              </div>

              <ProjectSubmissionForm />
            </div>
          </section>
        </div>
      </main>
    </EditorialPageFrame>
  );
}
