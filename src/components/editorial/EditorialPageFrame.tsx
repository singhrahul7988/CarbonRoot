import type { ReactNode } from "react";

import Link from "next/link";

type EditorialPageKey = "supply" | "impact" | "compliance" | "pricing" | null;

type EditorialPageFrameProps = {
  active: EditorialPageKey;
  children: ReactNode;
};

const NAV_ITEMS = [
  { key: "supply", label: "Supply", href: "/supply" },
  { key: "impact", label: "Impact", href: "/impact" },
  { key: "compliance", label: "Compliance", href: "/compliance" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
] as const;

const FOOTER_COLUMNS = [
  {
    heading: "Standards",
    links: [
      { label: "ESG Standards", href: "/compliance" },
      { label: "Verra Certification", href: "/supply" },
    ],
  },
  {
    heading: "Transparency",
    links: [
      { label: "Gold Standard", href: "/supply" },
      { label: "Audit Logs", href: "/impact" },
    ],
  },
  {
    heading: "Legal",
    links: [{ label: "Privacy Policy", href: "/pricing" }],
  },
] as const;

function getNavClassName(active: boolean) {
  return active
    ? "border-b-2 border-[var(--color-text-strong)] pb-1 font-[var(--font-display)] font-bold text-[var(--color-text-strong)] transition-all"
    : "font-[var(--font-display)] text-[var(--color-text-primary)] opacity-70 transition-all hover:text-[var(--color-text-strong)] hover:opacity-100";
}

export function EditorialPageFrame({
  active,
  children,
}: EditorialPageFrameProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[1440px] -translate-x-1/2 items-center justify-between bg-[var(--color-bg)] px-5 py-6 sm:px-8 xl:px-12">
        <div className="flex items-center gap-8 xl:gap-12">
          <Link
            className="font-[var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-text-strong)]"
            href="/"
          >
            CarbonRoot
          </Link>

          <nav className="hidden items-center gap-6 md:flex xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                className={getNavClassName(item.key === active)}
                href={item.href}
                key={item.key}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            className="hidden px-4 py-2 font-[var(--font-display)] text-[0.875rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-strong)] transition-opacity hover:opacity-80 sm:inline-flex"
            href="/buy-offset"
          >
            Buy Offset
          </Link>

          <Link
            className="inline-flex rounded-lg bg-[linear-gradient(145deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] px-4 py-2.5 text-center font-[var(--font-display)] text-[0.75rem] font-bold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[0.99] active:scale-95 sm:px-6 sm:text-[0.875rem]"
            href="/book-demo"
            style={{ boxShadow: "var(--shadow-subtle)" }}
          >
            Book a Compliance Demo
          </Link>
        </div>
      </header>

      {children}

      <footer className="mt-20 bg-[var(--color-surface-alt)] px-5 py-16 sm:px-8 xl:px-12">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link
              className="mb-4 block font-[var(--font-display)] text-lg font-black text-[var(--color-text-strong)]"
              href="/"
            >
              CarbonRoot
            </Link>
            <p className="text-[0.875rem] text-[color:color-mix(in_srgb,var(--color-text-primary)_60%,transparent)]">
              The Earth&apos;s Ledger. Modern carbon accounting for a regenerative
              economy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-12">
            {FOOTER_COLUMNS.map((column) => (
              <div className="flex flex-col gap-4" key={column.heading}>
                <p className="font-[var(--font-body)] text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
                  {column.heading}
                </p>

                {column.links.map((link) => (
                  <Link
                    className="font-[var(--font-body)] text-[0.875rem] uppercase tracking-[0.12em] text-[color:color-mix(in_srgb,var(--color-text-primary)_60%,transparent)] transition-colors hover:text-[var(--color-text-strong)]"
                    href={link.href}
                    key={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1440px] border-t border-[color:color-mix(in_srgb,var(--color-border)_20%,transparent)] pt-6">
          <p className="font-[var(--font-body)] text-[0.75rem] uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--color-text-primary)_60%,transparent)]">
            &copy; CarbonRoot. The Earth&apos;s Ledger.
          </p>
        </div>
      </footer>
    </div>
  );
}
