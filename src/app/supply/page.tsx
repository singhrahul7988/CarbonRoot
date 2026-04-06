import type { Metadata } from "next";

import Link from "next/link";
import { BadgeCheck, Search } from "lucide-react";

import { EditorialPageFrame } from "@/components/editorial/EditorialPageFrame";
import { PROJECTS_BY_SLUG, SUPPLY_PROJECTS } from "@/lib/projects";

function formatCredits(value: number) {
  return value.toLocaleString("en-US");
}

const FILTER_GROUPS = [
  {
    label: "Project Type",
    options: [
      { label: "Afforestation", checked: true },
      { label: "Blue Carbon", checked: false },
      { label: "Direct Air Capture", checked: false },
    ],
  },
  {
    label: "Region",
    options: [
      { label: "Sub-Saharan Africa", checked: false },
      { label: "South America", checked: true },
      { label: "Southeast Asia", checked: false },
    ],
  },
  {
    label: "Certification",
    options: [
      { label: "Verra VCS", checked: true },
      { label: "Gold Standard", checked: false },
    ],
  },
] as const;

const FEATURED_PROJECT = PROJECTS_BY_SLUG["oceanic-mangrove-initiative"];

export const metadata: Metadata = {
  title: "Supply | CarbonRoot",
  description: "Explore verified CarbonRoot supply opportunities across project types and regions.",
};

export default function SupplyPage() {
  return (
    <EditorialPageFrame active="supply">
      <main className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-8 px-5 pb-20 pt-28 sm:px-8 xl:gap-12 xl:px-12">
        <aside className="col-span-12 space-y-10 xl:col-span-3 xl:space-y-12">
          <div>
            <h2 className="mb-6 border-b border-[color:color-mix(in_srgb,var(--color-border)_20%,transparent)] pb-2 font-[var(--font-display)] text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
              Filter Projects
            </h2>

            {FILTER_GROUPS.map((group) => (
              <div className="mb-10" key={group.label}>
                <p className="mb-4 font-[var(--font-display)] text-[0.875rem] font-bold text-[var(--color-text-strong)]">
                  {group.label}
                </p>

                <div className="space-y-3">
                  {group.options.map((option) => (
                    <label className="flex cursor-pointer items-center gap-3" key={option.label}>
                      <input
                        className="h-4 w-4 rounded-sm border-[var(--color-border)] text-[var(--color-accent)]"
                        defaultChecked={option.checked}
                        type="checkbox"
                      />
                      <span className="text-[0.875rem] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-strong)]">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="col-span-12 xl:col-span-9">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:w-2/3">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:color-mix(in_srgb,var(--color-text-muted)_70%,transparent)]" />
              <input
                className="w-full border-0 border-b-2 border-[var(--color-accent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-12 py-4 text-[0.875rem] outline-none"
                placeholder="Search by project name or location..."
                type="text"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Sort By
              </span>
              <select
                className="border-0 bg-transparent font-[var(--font-display)] font-bold text-[var(--color-text-strong)] outline-none"
                defaultValue="Price: Low to High"
              >
                <option>Price: Low to High</option>
                <option>Volume: High to Low</option>
                <option>Project Maturity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {SUPPLY_PROJECTS.filter(
              (project) => project.slug !== FEATURED_PROJECT.slug,
            ).map((project) => (
              <article
                className="flex flex-col overflow-hidden bg-white"
                key={project.title}
                style={{ boxShadow: "var(--shadow-subtle)" }}
              >
                <div className="relative h-[280px] overflow-hidden">
                  <img
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    src={project.image}
                  />
                  <div className="absolute left-4 top-4 rounded-sm border border-[color:color-mix(in_srgb,var(--color-highlight)_40%,var(--color-text-strong)_10%)] bg-[var(--color-highlight)] px-3 py-1">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#5b4300]">
                      {project.badge}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-[var(--font-display)] text-xl font-extrabold leading-tight text-[var(--color-text-strong)]">
                      {project.title}
                    </h2>
                    <BadgeCheck className="mt-1 h-5 w-5 text-[color:color-mix(in_srgb,var(--color-text-muted)_70%,transparent)]" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                      <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--color-text-muted)_70%,transparent)]">
                        Price per ton
                      </p>
                      <p className="font-[var(--font-display)] text-lg font-bold text-[var(--color-text-strong)]">
                        {project.price}{" "}
                        <span className="text-[0.75rem] font-normal text-[var(--color-text-muted)]">
                          USD
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--color-text-muted)_70%,transparent)]">
                        Available Volume
                      </p>
                      <p className="font-[var(--font-display)] text-lg font-bold text-[var(--color-text-strong)]">
                        {formatCredits(project.availableCredits)}{" "}
                        <span className="text-[0.75rem] font-normal text-[var(--color-text-muted)]">
                          CRT
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      className="inline-block border-b-2 border-[color:color-mix(in_srgb,var(--color-border)_40%,transparent)] text-[0.875rem] font-bold uppercase tracking-[0.15em] text-[var(--color-text-strong)] transition-colors hover:border-[var(--color-text-strong)]"
                      href={`/projects/${project.slug}`}
                    >
                      View Project Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            <article
              className="grid overflow-hidden bg-[var(--color-surface-elevated)] lg:col-span-2 lg:grid-cols-2"
              style={{ boxShadow: "var(--shadow-subtle)" }}
            >
              <div className="h-[320px] overflow-hidden lg:h-full">
                <img
                  alt={FEATURED_PROJECT.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  src={FEATURED_PROJECT.image}
                />
              </div>

              <div className="flex flex-col justify-center gap-6 p-8 sm:p-10">
                <div className="inline-flex self-start bg-[var(--color-accent-2)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white">
                  {FEATURED_PROJECT.badge}
                </div>
                <h2 className="font-[var(--font-display)] text-3xl font-extrabold leading-tight text-[var(--color-text-strong)]">
                  {FEATURED_PROJECT.title}
                </h2>
                <p className="max-w-md text-[0.875rem] leading-relaxed text-[var(--color-text-muted)]">
                  {FEATURED_PROJECT.description}
                </p>

                <div className="flex flex-wrap gap-10">
                  <div>
                    <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--color-text-muted)_70%,transparent)]">
                      Price
                    </p>
                    <p className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                      {FEATURED_PROJECT.price}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--color-text-muted)_70%,transparent)]">
                      Available Credits
                    </p>
                    <p className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-strong)]">
                      {formatCredits(FEATURED_PROJECT.availableCredits)} CRT
                    </p>
                  </div>
                </div>

                <Link
                  className="inline-flex self-start rounded-lg bg-[linear-gradient(145deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] px-8 py-4 text-[0.875rem] font-bold uppercase tracking-[0.15em] text-white"
                  href={`/projects/${FEATURED_PROJECT.slug}`}
                  style={{ boxShadow: "var(--shadow-subtle)" }}
                >
                  View Project Details
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
