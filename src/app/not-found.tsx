import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-5 py-24 sm:px-8 xl:px-12">
      <section className="grid gap-8 rounded-[28px] border border-[color:color-mix(in_srgb,var(--color-border)_35%,transparent)] bg-white px-8 py-12 sm:px-12 sm:py-16">
        <div className="inline-flex w-fit rounded-full border border-[color:color-mix(in_srgb,var(--color-highlight)_45%,var(--color-surface)_55%)] bg-[var(--color-highlight)] px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#5b4300]">
          CarbonRoot
        </div>

        <div className="grid gap-4">
          <p className="font-[var(--font-display)] text-[0.8rem] font-extrabold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            The Earth&apos;s Ledger
          </p>
          <h1 className="max-w-3xl font-[var(--font-display)] text-5xl font-extrabold tracking-[-0.05em] text-[var(--color-text-strong)] md:text-6xl">
            This page is not available.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
            The route may have changed while the demo evolved. Use the actions below
            to return to the verified CarbonRoot flows.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-lg bg-[linear-gradient(145deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] px-6 py-4 text-center font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-px active:scale-[0.99]"
            href="/"
            style={{ boxShadow: "var(--shadow-subtle)" }}
          >
            Return to Landing Page
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-lg border border-[color:color-mix(in_srgb,var(--color-border)_70%,transparent)] px-6 py-4 text-center font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-strong)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            href="/supply"
          >
            View Marketplace Supply
          </Link>
        </div>
      </section>
    </main>
  );
}
