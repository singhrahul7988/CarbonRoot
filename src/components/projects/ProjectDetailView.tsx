import Link from "next/link";

import type { ProjectDetail } from "@/lib/projects";
import { EditorialPageFrame } from "@/components/editorial/EditorialPageFrame";

function formatCredits(value: number) {
  return value.toLocaleString("en-US");
}

type ProjectDetailViewProps = {
  project: ProjectDetail;
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  return (
    <EditorialPageFrame active="impact">
      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 pb-20 pt-28 sm:px-8 xl:px-12">
        <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:gap-16">
          <div className="space-y-8">
            <div className="inline-flex rounded-sm border border-[color:color-mix(in_srgb,var(--color-highlight)_35%,var(--color-surface)_65%)] bg-[color:color-mix(in_srgb,var(--color-highlight)_70%,var(--color-surface)_30%)] px-3 py-1">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
                {project.badge}
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl font-[var(--font-display)] text-5xl font-extrabold leading-[0.92] tracking-[-0.04em] text-[var(--color-text-strong)] md:text-6xl">
                {project.title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)]">
                {project.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {project.metrics.map((metric) => (
                <div
                  className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-border)_45%,transparent)] bg-white px-5 py-6"
                  key={metric.label}
                  style={{ boxShadow: "var(--shadow-subtle)" }}
                >
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {metric.label}
                  </p>
                  <p className="font-[var(--font-display)] text-2xl font-bold tracking-[-0.03em] text-[var(--color-text-strong)]">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-[linear-gradient(145deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] px-6 py-4 text-center font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-px active:scale-[0.99]"
                href={`/buy-offset?project=${project.slug}`}
                style={{ boxShadow: "var(--shadow-subtle)" }}
              >
                Buy Offset
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-[color:color-mix(in_srgb,var(--color-border)_70%,transparent)] px-6 py-4 text-center font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-strong)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                href="/book-demo"
              >
                Book a Compliance Demo
              </Link>
            </div>

            <div className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-border)_45%,transparent)] bg-white px-5 py-5 text-sm leading-relaxed text-[var(--color-text-primary)]">
              <strong className="block font-[var(--font-display)] text-[var(--color-text-strong)]">
                Marketplace Availability
              </strong>
              <span className="mt-2 block text-[var(--color-text-muted)]">
                Token ID {project.tokenId} | {formatCredits(project.availableCredits)} CRT available
                {" "}at {project.price} per credit
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[color:color-mix(in_srgb,var(--color-border)_40%,transparent)] bg-[var(--color-surface-alt)] p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`${project.title} project landscape`}
              className="h-full w-full rounded-[22px] object-cover"
              src={project.image}
            />
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-5">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              Compliance Narrative
            </p>
            <h2 className="font-[var(--font-display)] text-4xl font-bold tracking-[-0.04em] text-[var(--color-text-strong)]">
              Why this project works in an enterprise demo
            </h2>
            <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
              {project.narrative}
            </p>
            <div className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-border)_45%,transparent)] bg-white px-5 py-5 text-sm leading-relaxed text-[var(--color-text-primary)]">
              <strong className="block font-[var(--font-display)] text-[var(--color-text-strong)]">
                Registry Snapshot
              </strong>
              <span className="mt-2 block text-[var(--color-text-muted)]">
                {project.standard} | {project.projectId} | {project.location} | Vintage{" "}
                {project.vintage}
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            {project.verifications.map((item) => (
              <div
                className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-border)_45%,transparent)] bg-white px-5 py-5 text-sm leading-relaxed text-[var(--color-text-primary)]"
                key={item}
                style={{ boxShadow: "var(--shadow-subtle)" }}
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
